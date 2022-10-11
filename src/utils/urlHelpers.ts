
export default function urlVerifier(videoUrl: string) {
  const url = videoUrl.trim()
  const videoId = url.slice(url.indexOf("v=") + 2)
  if (url.includes("youtube.com/v=") && videoId.length === 11) {
    return videoId
  }
  return null
}



