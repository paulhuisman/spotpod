export const timeFormatter = (ms) => {
  const obj = new Date(ms)

  const min = obj.getMinutes()

  const sec = obj.getSeconds()
  
  return `${min}min, ${sec} sec`;
}