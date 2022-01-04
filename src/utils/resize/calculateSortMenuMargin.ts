export const calculateSortMenuMargin = (value: number): string => {
  let result = ''

  if (value > 1200) result = 715 + (value - 1200) / 2 + 'px'
  else if (value > 768) result = value - 490 + 'px'
  else result = value - 190 + 'px'

  return result
}
