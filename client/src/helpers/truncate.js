export const setMaxChars = () => {
  const viewportWidth = window.innerWidth
 
  if(viewportWidth > 1280) {
    return 600
  }
  else if(viewportWidth > 768 && viewportWidth <= 1280) {
    return 150
  }
  else {
    return 80
  }
}