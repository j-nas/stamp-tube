import * as React from "react"

type Props = {
  children?: React.ReactNode
}
export default function Layout({ children }: Props): React.ReactNode {
  return (
    <>
      <nav>Nav bar</nav>
      <div>{children}</div>
    </>
  )
}
