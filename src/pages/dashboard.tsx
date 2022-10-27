import React, { FormEvent, useState } from "react"
import Head from "next/head"
import { useSession, signIn, signOut } from "next-auth/react"
import { trpc } from "../utils/trpc"
import Button from "../components/button"
import { videoList } from "../utils/mockData"
import { randomUUID as uuid } from "crypto"

enum View {
  VideoInfo = "VIDEO_INFO",
  VideosWithStamps = "VIDEOS_WITH_STAMPS",
  StampsByVideo = "STAMPS_BY_VIDEO",
  StampsByAuthor = "STAMPS_BY_USER",
}

const Dashboard = () => {
  const [videoIdInput, setVideoIdInput] = useState("csEjOEUIntw")
  const [currentVideoId, setCurrentVideoId] = useState("csEjOEUIntw")
  const [view, setView] = useState<View>(View.VideoInfo)
  const { data: session, status } = useSession()
  const ctx = trpc.useContext()
  const {
    data: videoInfo,
    isLoading: getVideoInfoIsLoading,
    isError: getVideoInfoIsError,
  } = trpc.youtube.getVideoInfo.useQuery(currentVideoId)
  const {
    data: videosWithStamps,
    isLoading: getVideosWithStampsIsLoading,
    isError: getVideosWithStampsIsError,
  } = trpc.youtube.getVideosWithStamps.useQuery()
  const {
    data: stampsByUser,
    isLoading: getStampsIsLoading,
    isError: getStampsIsError,
  } = trpc.stamps.getStampsByAuthor.useQuery(session?.user?.id)
  const {
    data: stampsByVideo,
    isLoading: getStampsByAuthorIsLoading,
    isError: getStampsByAuthorIsError,
    status: videostatus,
  } = trpc.stamps.getStampsByVideo.useQuery(currentVideoId)
  const createNewStamp = trpc.stamps.createStamps.useMutation({
    onMutate: async () => {
      ctx.stamps.getStampsByVideo.cancel()
      let optimisticUpdate = await ctx.stamps.getStampsByVideo.fetch(
        currentVideoId
      )
      if (optimisticUpdate) {
        ctx.stamps.getStampsByVideo.setData(optimisticUpdate)
      }
    },
    onSettled: () => ctx.stamps.getStampsByVideo.invalidate(),
  })
  const deleteStamp = trpc.stamps.deleteStamp.useMutation({
    onMutate: async (deletedStamp) => {
      ctx.stamps.getStampsByVideo.cancel()
      let optimisticUpdate = await ctx.stamps.getStampsByVideo.fetch(
        currentVideoId
      )
      if (optimisticUpdate) {
        ctx.stamps.getStampsByVideo.setData(
          optimisticUpdate.filter((stamp) => stamp.id !== deletedStamp.stampId)
        )
      }
    },
    onSettled: () => ctx.stamps.getStampsByVideo.invalidate(),
  })
  console.log(videosWithStamps)
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setCurrentVideoId(videoIdInput)
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <main className="flex h-screen w-screen flex-col place-content-center items-center justify-center gap-3 bg-gradient-to-tl from-teal-500 via-fuchsia-400 to-purple-900 text-white/50">
        <div className="flex h-auto max-h-min w-1/2 flex-col justify-items-center rounded-2xl bg-black/50 p-2 text-center drop-shadow-xl hover:backdrop-blur-3xl">
          <div>
            <ul>
              {videoList.map((video) => (
                <li>
                  <a onClick={() => setCurrentVideoId(video)}>{video}</a>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="justify-self-center text-5xl">Admin Dashboard</h1>
          {/*navbuttons */}
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
              <Button onClickFunction={() => setView(View.StampsByVideo)}>
                Stamps by Video
              </Button>
              <Button onClickFunction={() => setView(View.StampsByAuthor)}>
                Stamps by Author
              </Button>
              <Button onClickFunction={() => setView(View.VideosWithStamps)}>
                Videos with stamps
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
        {
          <div className="bg-black/50">
            <h2 className="text-3xl">Video Info from youtube api</h2>
            {getVideoInfoIsLoading ? (
              "loading"
            ) : (
              <table className="table-fixed text-lg">
                <thead>
                  <tr>
                    <th>Video ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{videoInfo?.id}</td>
                    <td>{videoInfo?.title}</td>
                    <td>{videoInfo?.description.slice(0, 100)}</td>
                    <td>{videoInfo?.duration}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        }
        {view === View.StampsByVideo && (
          <div className="rounded-xl bg-black/50 p-2">
            <h2 className="text-3xl">Stamps by video</h2>
            {status === "authenticated" && (
              <div>
                <Button
                  onClickFunction={() =>
                    createNewStamp.mutate({
                      author: session?.user?.id as string,
                      video: videoInfo?.id as string,
                    })
                  }
                >
                  Create new stamp
                </Button>
              </div>
            )}
            {getStampsIsLoading ? (
              "loading"
            ) : (
              <ul>
                {stampsByVideo?.map((stmp) => (
                  <li key={stmp.id}>
                    {`Author: ${
                      stmp.author.name
                    } Created: ${stmp.created.toLocaleString()} Number of timestamps: ${
                      stmp.timestamps.length
                    } `}
                    {status === "authenticated" && (
                      <Button
                        onClickFunction={() =>
                          deleteStamp.mutate({ stampId: stmp.id })
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {view === View.StampsByAuthor && (
          <div className="rounded-xl bg-black/50 p-2">
            <h2 className="text-3xl">
              {!session ? "Please log in" : `Stamps by ${session.user?.name}`}
            </h2>
            {status === "authenticated" && (
              <div>
                <Button
                  onClickFunction={() =>
                    createNewStamp.mutate({
                      author: session?.user?.id as string,
                      video: videoInfo?.id as string,
                    })
                  }
                >
                  Create new stamp
                </Button>
              </div>
            )}
            {getStampsByAuthorIsLoading ? (
              "loading"
            ) : (
              <ul>
                {stampsByUser?.map((stmp) => (
                  <li key={stmp.id}>
                    {`Author: ${
                      stmp.author.name
                    } Created: ${stmp.created.toLocaleString()} Video title: 
                      
                     `}
                    {status === "authenticated" && (
                      <Button
                        onClickFunction={() =>
                          deleteStamp.mutate({ stampId: stmp.id })
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {view === View.VideosWithStamps && (
          <div className="rounded-xl bg-black/50 p-2">
            <h2 className="text-3xl">Videos with stamps</h2>
            {/* {status === "authenticated" && (
              <div>
                <Button
                  onClickFunction={() =>
                    createNewStamp.mutate({
                      author: session?.user?.id as string,
                      video: videoInfo?.id as string,
                    })
                  }
                >
                  Create new stamp
                </Button>
              </div>
            )} */}
            {getVideosWithStampsIsLoading ? (
              "loading"
            ) : (
              <ul>
                {videosWithStamps?.map((video) => (
                  <li key={video.id}>
                    Title:
                    <a onClick={() => setCurrentVideoId(video.id)}>
                      {`${video.title} | `}
                    </a>
                    {`Description: ${video.description.slice(0, 50)} | `}
                    {`Number of stamps: placeholer`}
                    {/* {status === "authenticated" && (
                      <Button
                        onClickFunction={() =>
                          deleteStamp.mutate({ stampId: video.id })
                        }
                      >
                        Delete
                      </Button>
                    )} */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </>
  )
}

export default Dashboard
