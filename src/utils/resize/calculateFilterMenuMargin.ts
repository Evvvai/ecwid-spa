export const calculateFilterMenuMargin = (value: number): string => {
  let result = ''

  if (value > 1200) result = 895 + (value - 1200) / 2 + 'px'
  else result = value - 308 + 'px'

  return result
}
