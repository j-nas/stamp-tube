import z from 'zod'
const axios = require("axios").default;



export function youtubeIdExtract(url: string) {
  const reg = /^(https?:)?(\/\/)?((www\.|m\.)?youtube(-nocookie)?\.com\/((watch)?\?(feature=\w*&)?vi?=|embed\/|vi?\/|e\/)|youtu.be\/)([\w\-]{10,20})/i
  const match = url.match(reg);
  if (match) {

    return match[9];
  } else {
    return null;
  }
}

export async function getVideoInfo(videoId: string | null | undefined, apiKey: string) {
  if (!videoId) {
    throw new Error("invalid youtube url")
  }
  try {

    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
    console.log(response.data.items[0])
    return response.data.items[0]
  } catch (error) {
    console.error(error)
  }
}