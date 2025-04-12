export const formatedCoins = (item?: number) => {
  return item?.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export const formatedBigInt = (item?: number) => {
  return item?.toLocaleString()
}