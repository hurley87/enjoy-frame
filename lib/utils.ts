import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cultLogo(address: string) {
  const logos: Record<string, string> = {
    '0x27a040f96beb380029ffa15b3e0f0feec2893fb6': 'higher.jpg',
    '0xfffd4da1d89c17b337178d645278a7cc3d9ee811': 'gdupi.jpg',
    '0x4cb84bdf6f81d338d5cccc9fdaa2aa549d427676': 'anon.jpg',
    '0x83f3494acef796737424479b976401d4e2c1b07a': 'comicsans.jpg',
    '0x733bf0a23c57875b2be6b4d33983f17fe0bf1366': 'clanker.jpg',
    '0xa66d8c2721510fc06ed89c09ae9efef33944fd4d': 'blonde.jpg',
    '0x5e0b2b0821ab4fa4f93a35cbdc56ccbff8cc94d5': 'oil.jpg',
    '0x4d471e7a1651e4084f9d8f57deaddb49f9b7b98b': 'bleu.jpg',
    '0x2310fc31840734e68fbd616b7783fff47fbc4dde': 'tybg.jpg',
    '0x1df32a9d7febf07c60ee74c62da82fd11162c96a': 'helvetica.jpg',
    '0x860b81855a790f2431d27946cee8f839feaf9fa8': 'brunette.jpg',
  };
  return logos[address.toLowerCase()];
}

export function ticker(address: string) {
  const logos: Record<string, string> = {
    '0x27a040f96beb380029ffa15b3e0f0feec2893fb6': '$HIGHER',
    '0xfffd4da1d89c17b337178d645278a7cc3d9ee811': '$GDUP',
    '0x4cb84bdf6f81d338d5cccc9fdaa2aa549d427676': '$ANON',
    '0x83f3494acef796737424479b976401d4e2c1b07a': '$COMICSANS',
    '0x733bf0a23c57875b2be6b4d33983f17fe0bf1366': '$CLANKER',
    '0xa66d8c2721510fc06ed89c09ae9efef33944fd4d': '$BLONDE',
    '0x5e0b2b0821ab4fa4f93a35cbdc56ccbff8cc94d5': '$OIL',
    '0x4d471e7a1651e4084f9d8f57deaddb49f9b7b98b': '$BLEU',
    '0x2310fc31840734e68fbd616b7783fff47fbc4dde': '$TYBG',
    '0x1df32a9d7febf07c60ee74c62da82fd11162c96a': '$HELVETICA',
    '0x860b81855a790f2431d27946cee8f839feaf9fa8': '$BRUNETTE',
  };
  return logos[address.toLowerCase()];
}
