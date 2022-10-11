import { useRouter } from "next/router"
import YoutubeEmbed from "../components/youtubeEmbed"
import Head from "next/head"
const Stamps = () => {
  const router = useRouter()
  const { v } = router.query
  if (typeof v !== "string") {
    return <p>error</p>
  }

  if (!v) {
    return (
      <p className="flex flex-col items-center align-middle">nothing here</p>
    )
  }

  return (
    <>
      <Head key="stamp">
        {" "}
        {/* Youtube API call required to get title from video */}
        <title>"youtube API call here"</title>
      </Head>
      <main>
        <YoutubeEmbed embedId={v} />
        <p className="flex flex-col items-center align-middle">
          Video <a href={`https://www.youtube.com/watch?v=${v}`}>link</a>
        </p>
      </main>
    </>
  )
}

export default Stamps
