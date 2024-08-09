// src/utils/envEncryptDecrypt.ts
import * as fs from "fs";
import * as path from "path";
import { encrypt } from "./cryptoUtil";

const configDir = path.resolve(__dirname, "..", "..", "envs");
const inputEnvFilePath = `${configDir}/.env.local`;
const outputEnvFilePath = `${configDir}/.env.local`;

export function encryptEnvFile(): void {
  const envFileContent = fs.readFileSync(inputEnvFilePath, "utf8");
  const envLines = envFileContent.split("\n");

  const encryptedLines = envLines.map((line) => {
    const [key, value] = line.split("=");
    if (value) {
      const encryptedValue = encrypt(value);
      return `${key}=${encryptedValue}`;
    }
    return line;
  });

  const updatedEnvContent = encryptedLines.join("\n");
  fs.writeFileSync(outputEnvFilePath, updatedEnvContent, "utf8");

  console.log(`Encryption complete. Updated ${inputEnvFilePath} file.`);
}

// Uncomment the following line to test the function directly
encryptEnvFile();
