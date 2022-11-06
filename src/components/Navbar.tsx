import { useState, useEffect } from "react"
import Button from "./button"
import { Navbar, Dropdown } from "flowbite-react"
import { TfiStamp } from "react-icons/tfi"
type Props = {
  pageTitle: string
}
export default function oldNavbar({ pageTitle }: Props) {
  const oldReturn = (
    <nav className="h-12 border-b-2 border-solid px-2">
      <div className="float-left">Stamp Tube - {pageTitle}</div>
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
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="http://localhost:3000"></Navbar.Brand>
      <Navbar.
    </Navbar>
  )
}
