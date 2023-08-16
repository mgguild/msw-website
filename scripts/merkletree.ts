import fs from 'fs';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

// npx ts-node scripts/merkleTree.ts
async function main() {
  fs.readFile('whitelists.txt', 'utf8', function (wlErr: unknown, wlData: string) {
    let whitelists: Buffer[] = [];
    let oglists: Buffer[] = [];
    let whitelistsRoot = '';
    let oglistsRoot = '';

    if (wlErr) {
      console.log(wlErr);
    }
    const addresses = wlData.split('\n');
    whitelists = addresses
      .filter(x => x.trim() !== '')
      .map(x => keccak256(x.trim().toLowerCase()));

    const tree = new MerkleTree(whitelists, keccak256, { sortPairs: true });
    whitelistsRoot = tree.getRoot().toString('hex');

    fs.readFile('oglists.txt', 'utf8', function (ogErr: unknown, ogData: string) {
      if (ogErr) {
        console.log(ogErr);
      }
      const addresses = ogData.split('\n');
      oglists = addresses
        .filter(x => x.trim() !== '')
        .map(x => keccak256(x.trim().toLowerCase()));

      const tree = new MerkleTree(oglists, keccak256, { sortPairs: true });
      oglistsRoot = tree.getRoot().toString('hex');

      fs.writeFile(
        'public/leaves.json',
        JSON.stringify({ whitelists, oglists, whitelistsRoot, oglistsRoot }),
        err => {
          console.log(err);
        },
      );
    });
  });
}

main().catch(error => console.log(error));
