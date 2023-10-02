import fs from 'fs';
import { ethers } from 'ethers';

// npx ts-node scripts/cleanWhitelists.ts
async function main() {
  const args = process.argv.slice(2);
  const filename = args[0];
  const whitelists: string[] = [];

  fs.readFile(filename, 'utf8', function (err: unknown, data: string) {
    if (err) {
      console.log(err);
    }

    const addresses = data.split('\n');

    addresses.forEach(address => {
      if (address.trim() !== '') {
        const cleanedAddress = address.trim().toLowerCase();
        const idx = whitelists.findIndex(item => item === cleanedAddress);

        if (idx === -1) {
          if (ethers.utils.isAddress(cleanedAddress)) {
            whitelists.push(cleanedAddress);
          } else {
            console.log(`Invalid address: ${cleanedAddress}`);
          }
        }
      }
    });

    const text = whitelists.join('\n');
    fs.writeFile(filename, text, err => {
      console.log(err);
    });
  });
}

main().catch(error => console.log(error));
