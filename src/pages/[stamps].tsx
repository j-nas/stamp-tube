import React, { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { v4 as uuidv4 } from "uuid"
import { trpc } from "../utils/trpc"
import { newLineFormatter } from "../utils/stringHelpers"
import YoutubeEmbed from "../components/youtubeEmbed"

const Stamps = () => {
  const [descMaxLength, setDescMaxLength] = useState(500)
  const router = useRouter()
  const { v } = router.query
  const { data } = trpc.youtube.getVideoInfo.useQuery({ v })
  const stamps = trpc.stamps.createStamps.useMutation()
  const title = data?.data.items[0]?.snippet.title
  const description = data?.data.items[0]?.snippet.description
  console.log(stamps)
  if (!title || !description) {
    return <p>loading</p>
  }
  if (typeof v !== "string" || v.length !== 11) {
    return <p>input has to be an 11 character string</p>
  }
  if (!v) {
    return (
      <p className="flex flex-col items-center align-middle">nothing here</p>
    )
  }

  const desc = description.slice(0, descMaxLength)
  return (
    <>
      <Head key="stamp">
        <title>{`StampTube: ${title}`}</title>
      </Head>
      <main className="min-h-screen max-w-md bg-slate-700 bg-gradient-to-br from-indigo-500">
        <YoutubeEmbed embedId={v} />
        <p className="flex flex-col items-center align-middle">
          Video <a href={`https://www.youtube.com/watch?v=${v}`}>link</a>
        </p>
        <div className=" text-white/80">
          <p id="video-description">
            {newLineFormatter(desc).map((line) => {
              return (
                <React.Fragment key={uuidv4()}>
                  {line}

                  <br />
                </React.Fragment>
              )
            })}
          </p>
          {description.length < 500 ? null : descMaxLength === 500 ? (
            <a className="underline" onClick={() => setDescMaxLength(99999)}>
              Show More
            </a>
          ) : (
            <a className="underline" onClick={() => setDescMaxLength(500)}>
              Show Less
            </a>
          )}
        </div>
        <div></div>
      </main>
    </>
  )
}

export default Stamps
