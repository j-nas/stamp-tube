import type { NextPage } from "next"
import Head from "next/head"
import { signIn, signOut, useSession } from "next-auth/react"
import { trpc } from "../utils/trpc"
import Button from "../components/button"
import { useState } from "react"
import { youtubeIdExtract } from "../utils/urlHelpers"
const Home: NextPage = () => {
  const [urlForm, setUrlForm] = useState("")
  const urlValidation = (url: string) => {
    return youtubeIdExtract(url)
  }

  return (
    <>
      <Head>
        <title>StampTube</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center  p-4">
        <h1 className="text-3xl">StampTube</h1>
        <h2>{urlForm}</h2>
        <p>A place for community submitted timestamps</p>
        <Button>Log in with Google</Button>
        <Button
          bgColor="bg-purple-400"
          onClickFunction={() => signIn("discord")}
        >
          Log in with Discord
        </Button>
        <form className="p2 rounded-md border-2 border-zinc-400">
          <input type="text" onChange={(e) => setUrlForm(e.target.value)} />
          <button
            type="submit"
            className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
          >
            submit
          </button>
        </form>
      </main>
    </>
  )
}

export default Home
