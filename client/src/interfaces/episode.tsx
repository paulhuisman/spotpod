interface Episode {
  id: number,
  name: string,
  description: string,
  publisher: string,
  uri: string,
  image: string,
  duration_ms: number,
  images: any[]
}

export default Episode