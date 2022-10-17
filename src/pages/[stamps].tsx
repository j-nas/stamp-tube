import { useRouter } from "next/router"
import { useState } from "react"
import { newLineFormatter } from "../utils/stringHelpers"
import useSwr from "swr"
import YoutubeEmbed from "../components/youtubeEmbed"
import Head from "next/head"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error(
      "This is an error constructor. Please give me a bettter message"
    )
    throw error
  }
  return res.json()
}

const Stamps = () => {
  const [descMaxLength, setDescMaxLength] = useState(500)
  const router = useRouter()
  const { v } = router.query
  const { data, error } = useSwr(`/api/videoInfo?id=${v}`, fetcher)

  if (typeof v !== "string" || v.length !== 11) {
    return <p>input has to be an 11 character string</p>
  }
  if (!v) {
    return (
      <p className="flex flex-col items-center align-middle">nothing here</p>
    )
  }
  if (error) {
    console.log(typeof error)
    return <p>error</p>
  }
  if (!data) return <p>Loading...</p>
  const { title, description } = data
  const desc = description.slice(0, descMaxLength)
  return (
    <>
      <Head key="stamp">
        <title>{`StampTube: ${title}`}</title>
      </Head>
      <main>
        <YoutubeEmbed embedId={v} />
        <p className="flex flex-col items-center align-middle">
          Video <a href={`https://www.youtube.com/watch?v=${v}`}>link</a>
        </p>
        <div>
          <p>
            {newLineFormatter(desc).map((line) => {
              return (
                <div>
                  {line}

                  <br />
                </div>
              )
            })}
          </p>
          {descMaxLength === 500 ? (
            <a
              className="text-blue-800"
              onClick={() => setDescMaxLength(99999)}
            >
              Show more
            </a>
          ) : (
            <a className="text-blue-800" onClick={() => setDescMaxLength(500)}>
              Show less
            </a>
          )}
        </div>
      </main>
    </>
  )
}

export default Stamps
