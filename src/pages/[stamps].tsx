import { NextComponentType, NextPage } from "next/types"
import YoutubeEmbed from "../components/youtubeEmbed"
import { useState } from "react"
import { BiEdit, BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi"
const VIDEO_ID = "csEjOEUIntw"

const TimeStampCard: NextComponentType = () => {
  return (
    <div className="m-4 grid h-36 w-36 flex-none snap-center justify-items-stretch bg-neutral-400 p-2 drop-shadow-lg">
      <div>
        <p className="basis-1/2 self-end text-right">4:20</p>
      </div>
      <div>
        <p className="">
          {/* max length 64 characterts */}
          Cat Scratching at window Lorem, ipsum dolor sit amet consectetur
        </p>
      </div>
    </div>
  )
}

const StampView: NextComponentType = () => {
  return (
    <div className="m-2 mt-8 rounded-lg bg-neutral-500 py-4 drop-shadow-lg  md:mt-0">
      <div className="border-b-4 border-neutral-900 px-3  pb-2 text-lg">
        <p className="text-ellipsis text-start leading-tight">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius, cumque
          maiores <span className="text-neutral-300">...</span>
        </p>
      </div>
      <div className=" flex overflow-y-auto ">
        <TimeStampCard />
        <TimeStampCard />
        <TimeStampCard />
        <TimeStampCard />
        <TimeStampCard />
      </div>
      <div className="mx-2 px-2 pb-8">
        <div className="float-left text-right">+3</div>
        <div className="float-right">Submitted by </div>
      </div>
      <div className="relative pb-3">
        <button
          type="button"
          aria-label="up vote"
          className="absolute left-3 -bottom-12 z-50 rounded-full bg-neutral-600 p-2 text-5xl text-neutral-50 drop-shadow-2xl"
        >
          <BiUpArrowAlt />
        </button>
        <button
          type="button"
          aria-label="down vote"
          className="absolute left-20 -bottom-12 z-50 rounded-full bg-neutral-600 p-2 text-5xl text-neutral-50 drop-shadow-2xl"
        >
          <BiDownArrowAlt />
        </button>
        <button
          type="button"
          aria-label="edit"
          className="absolute right-3 -bottom-12 z-50 rounded-full bg-neutral-600 p-2 text-5xl text-neutral-50 drop-shadow-2xl"
        >
          <BiEdit />
        </button>
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
const StampList: NextComponentType = () => {
  return (
    <div className=" m-2 mt-8 flex place-content-center rounded-lg bg-neutral-500 p-4 text-neutral-300  drop-shadow-lg">
      <div>
        <table className="">
          <thead className="bg-neutral-700">
            <tr className="">
              <th>Date submitted</th>
              <th>Author</th>
              <th>Rating</th>
              <th colSpan={2} className="text-left">
                stamps
              </th>
            </tr>
          </thead>
          <tbody className="divide-yr">
            <tr>
              <td className="py-4 px-6">Today</td>
              <td className="py-4 px-6">Runic Letters</td>
              <td className="py-4 px-6">69</td>
              <td className="py-4 px-6">420</td>
              <td className="py-4 px-6 text-right">
                <a>Set active</a>
              </td>
            </tr>

            <tr>
              <td className="py-4 px-6">Today</td>
              <td className="py-4 px-6">Runic Letters</td>
              <td className="py-4 px-6">69</td>
              <td className="py-4 px-6">420</td>
              <td className="py-4 px-6 text-right">
                <a>Set active</a>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6">Today</td>
              <td className="py-4 px-6">Runic Letters</td>
              <td className="py-4 px-6">69</td>
              <td className="py-4 px-6">420</td>
              <td className="py-4 px-6 text-right">
                <a>Set active</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export const Stamps: NextPage = () => {
  return (
    <div className="font- min-h-screen bg-neutral-800 text-white">
      <div className="sticky top-0 z-50 w-full  md:static md:flex md:max-h-screen  md:place-content-stretch md:p-8 md:pt-8">
        <div className="md:w-1/2 md:place-self-center">
          <YoutubeEmbed embedId={VIDEO_ID} />
        </div>
        <div className="hidden md:block md:w-1/2 md:place-self-center">
          <StampView />
        </div>
      </div>
      <div className="hidden md:flex md:place-content-center">
        <StampList />
      </div>
      <div className="flex flex-col gap-1 md:hidden">
        <StampView />
        <StampList />
      </div>
    </div>
  )
}

export default Stamps
