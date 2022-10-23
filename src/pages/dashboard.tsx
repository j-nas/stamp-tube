import React, { FormEvent, useState } from "react"
import { useRouter } from "next/router"
import { useSession, signIn, signOut } from "next-auth/react"
import { trpc } from "../utils/trpc"
import Button from "../components/button"

enum View {
  VideoInfo = "VIDEO_INFO",
  Stamps = "STAMPS",
}
const Dashboard = () => {
  const { data: session, status } = useSession()
  const [videoIdInput, setVideoIdInput] = useState("csEjOEUIntw")
  const [currentVideoId, setCurrentVideoId] = useState("csEjOEUIntw")
  const [view, setView] = useState<View>(View.VideoInfo)
  const videoData = trpc.youtube.getVideoInfo.useQuery({ v: currentVideoId })

  if (!videoData.data) return <p>loading...</p>
  const videoInfo = {
    videoId: videoData.data.data.items[0]?.id,
    title: videoData.data.data.items[0]?.snippet.title,
    description: videoData.data.data.items[0]?.snippet.description,
  }
  const { videoId, title, description } = videoInfo
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setCurrentVideoId(videoIdInput)
  }
  console.log(videoData)
  return (
    <>
      <main className="flex h-screen w-screen flex-col place-content-center items-center justify-center gap-3 bg-gradient-to-tl from-teal-500 via-fuchsia-400 to-purple-900 text-white/50">
        <div className="flex h-auto max-h-min w-1/2 flex-col justify-items-center rounded-2xl bg-black/50 p-2 text-center drop-shadow-xl hover:backdrop-blur-3xl">
          <h1 className="justify-self-center text-5xl">Admin Dashboard</h1>
          <div className="flex flex-row align-middle">
            <>
              <Button onClickFunction={() => signIn()}>Log in</Button>
            </>
            <>
              <Button onClickFunction={() => signOut()}>Log out</Button>
            </>
            <>
              <Button onClickFunction={() => setView(View.VideoInfo)}>
                Video Info
              </Button>
            </>
            <>
              <Button onClickFunction={() => setView(View.Stamps)}>
                Stamp list
              </Button>
            </>
            <p>Status: {status}</p>
          </div>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label>
                video id:
                <input
                  className="mx-1 cursor-text text-black"
                  value={videoIdInput}
                  onChange={(e) => setVideoIdInput(e.target.value)}
                  type="text"
                />
                <button
                  className=" border-2 border-solid border-cyan-400"
                  type="submit"
                >
                  submit
                </button>
              </label>
            </form>
          </div>
        </div>
        {view === View.VideoInfo && (
          <div className="bg-black/50 text-3xl">
            <h2>Video Info from youtube api</h2>
            <table className="table-fixed text-lg">
              <thead>
                <tr>
                  <th>Video ID</th>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{videoId}</td>
                  <td>{title}</td>
                  <td>{description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {view === View.Stamps && (
          <div>
            <h2 className="rounded-xl bg-black/50 text-3xl">Stamps</h2>
          </div>
        )}
      </main>
    </>
  )
}

export default Dashboard
