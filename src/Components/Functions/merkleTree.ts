import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';

function getProof(merkleTree: MerkleTree | null, address: string) {
  if (!merkleTree) return merkleTree;
  return merkleTree.getHexProof(keccak256(address?.toLowerCase()));
}

export { getProof };
