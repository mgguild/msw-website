const maticToWei = (maticAmount: number): number => {
  const wei: number = maticAmount * Math.pow(10, 18)
  return wei
}

export default maticToWei