// src/utils/cryptoUtil.ts
import CryptoJS from 'crypto-js';

const SALT = process.env.SALT || 'defaultSALT';

export function encrypt(text: string): string {
  const cipherText = CryptoJS.AES.encrypt(text, SALT).toString();
  return cipherText;
}

export function decrypt(cipherText: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, SALT);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}
