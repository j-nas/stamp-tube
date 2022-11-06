import { useState, useEffect } from "react"
import { TfiStamp } from "react-icons/tfi"
import Logo from "../assets/stampTubeLogo.svg"
type Props = {
  pageTitle: string
}
export default function oldNavbar({ pageTitle }: Props) {
  const oldReturn = (
    <nav className="h-12 border-b-2 border-solid px-2">
      <div className="float-left">
        <Logo className="h-10 w-16" />
      </div>
      <div className="float-right divide-x-2">
        <div className="invisible lg:visible">
          <button>search</button>
          <button>Login</button>
          <button>Profile</button>
          <button>DarkMode</button>
        </div>
        <div className="lg:invisible">
          <button>menu</button>
        </div>
      </div>
    </nav>
  )
  return oldReturn
}
