import { NextComponentType, NextPage } from "next/types"
import YoutubeEmbed from "../components/youtubeEmbed"
import { useState } from "react"

const VIDEO_ID = "csEjOEUIntw"

const StampCard: NextComponentType = () => {
  return (
    <div className="m-4 h-24 w-24 flex-none bg-gray-400 p-2 drop-shadow-lg">
      <p className="text-justify">Cat Scratching at window</p>
      <p className="text-right">4:20</p>
    </div>
  )
}

const StampView: NextComponentType = () => {
  enum View {
    Description = "DESCRIPTION",
    Timestamps = "TIMESTAMPS",
  }
  const [view, setView] = useState<View>(View.Description)

  return (
    <div className="mt-2  rounded-t-lg bg-gray-500 p-8 shadow-lg">
      {/* <div className="flex justify-around text-gray-700">
        <button className="items-stretch bg-gray-300 p-1">Timestamps</button>
        <button className="items-stretch bg-gray-300 p-1">
          Video Description
        </button>
      </div> */}
      <div className="border-b-4 border-gray-900 text-lg">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius, cumque
          maiores <span className="text-gray-300">...</span>
        </p>
      </div>
      <div className=" flex overflow-y-auto ">
        <StampCard />
        <StampCard />
        <StampCard />
        <StampCard />

        <StampCard />

        {/* <table className="flex table-fixed justify-items-stretch">
          <tbody>
            <tr className="">
              <td className="w-40 basis-1/2 text-right text-blue-500 underline">
                0:01
              </td>
              <td className="w-40 basis-1/2">Cat.</td>
            </tr>
            <tr>
              <td>0:02</td>
              <td>Cat.</td>
            </tr>
            <tr>
              <td>0:03</td>
              <td>Cat.</td>
            </tr>
            <tr>
              <td>0:04</td>
              <td>Cat.</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  )
}
const NewStampModal: NextComponentType = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        className="mr-1 mb-1 rounded bg-pink-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <p className="my-4 text-lg leading-relaxed text-slate-500">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  )
}
export const Stamps: NextPage = () => {
  return (
    <div className="h-screen  bg-gray-800 text-white">
      <div className="sticky top-0 w-full ">
        <YoutubeEmbed embedId={VIDEO_ID} />
      </div>
      <div className="flexflex-col">
        <StampView />
      </div>
    </div>
  )
}

export default Stamps
