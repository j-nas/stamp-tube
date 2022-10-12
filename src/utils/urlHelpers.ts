import z from 'zod'

export function youtubeIdExtract(url: string) {
  const reg = /^(https?:)?(\/\/)?((www\.|m\.)?youtube(-nocookie)?\.com\/((watch)?\?(feature=\w*&)?vi?=|embed\/|vi?\/|e\/)|youtu.be\/)([\w\-]{10,20})/i
  const match = url.match(reg);
  if (match) {

    return match[9];
  } else {
    return null;
  }
}