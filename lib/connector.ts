import sdk from '@farcaster/frame-sdk';
import { SwitchChainError, fromHex, getAddress, numberToHex } from 'viem';
import { ChainNotConfiguredError, createConnector } from 'wagmi';

frameConnector.type = 'frameConnector' as const;

export function frameConnector() {
  let connected = true;

  return createConnector<typeof sdk.wallet.ethProvider>((config) => ({
    id: 'farcaster',
    name: 'Farcaster Wallet',
    type: frameConnector.type,

    async setup() {
      await this.connect({ chainId: config.chains[0].id });
    },

    async getProvider() {
      if (!sdk.wallet?.ethProvider) {
        throw new Error('Farcaster provider not available');
      }
      return sdk.wallet.ethProvider;
    },

    async connect({ chainId } = {}) {
      try {
        const provider = await this.getProvider();

        if (!provider) {
          throw new Error('Failed to initialize Farcaster provider');
        }

        let accounts;
        try {
          accounts = await provider.request({
            method: 'eth_requestAccounts',
          });
        } catch (error) {
          console.error('Failed to request accounts:', error);
          throw new Error('Failed to connect to Farcaster wallet');
        }

        let currentChainId = await this.getChainId();
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId });
          currentChainId = chain.id;
        }

        connected = true;

        return {
          accounts: accounts.map((x) => getAddress(x)),
          chainId: currentChainId,
        };
      } catch (error) {
        connected = false;
        throw error;
      }
    },

    async disconnect() {
      connected = false;
    },
    async getAccounts() {
      try {
        if (!connected) throw new Error('Not connected');
        const provider = await this.getProvider();
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
        });
        return accounts.map((x) => getAddress(x));
      } catch (error) {
        connected = false;
        throw error;
      }
    },
    async getChainId() {
      const provider = await this.getProvider();
      const hexChainId = await provider.request({ method: 'eth_chainId' });
      return fromHex(hexChainId, 'number');
    },
    async isAuthorized() {
      if (!connected) {
        return false;
      }

      const accounts = await this.getAccounts();
      return !!accounts.length;
    },
    async switchChain({ chainId }) {
      const provider = await this.getProvider();
      const chain = config.chains.find((x) => x.id === chainId);
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());

      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: numberToHex(chainId) }],
      });
      return chain;
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect();
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        });
    },
    onChainChanged(chain) {
      const chainId = Number(chain);
      config.emitter.emit('change', { chainId });
    },
    async onDisconnect() {
      config.emitter.emit('disconnect');
      connected = false;
    },
  }));
}
