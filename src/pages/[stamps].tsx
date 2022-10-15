import { useRouter } from "next/router"
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
  const router = useRouter()
  const { v } = router.query
  const { data, error } = useSwr(`/api/videoInfo?id=${v}`, fetcher)

  if (typeof v !== "string") {
    return <p>error</p>
  }
  if (!v) {
    return (
      <p className="flex flex-col items-center align-middle">nothing here</p>
    )
  }
  console.log(data)

  if (error) return <p>Failed to get video info</p>
  if (!data) return <p>Loading...</p>

  return (
    <>
      <Head key="stamp">
        {/* Youtube API call required to get title from video */}
        <title>{data.title}</title>
      </Head>
      <main>
        <YoutubeEmbed embedId={v} />
        <p className="flex flex-col items-center align-middle">
          Video <a href={`https://www.youtube.com/watch?v=${v}`}>link</a>
        </p>
        <p>{data.description}</p>
      </main>
    </>
  )
}

export default Stamps
