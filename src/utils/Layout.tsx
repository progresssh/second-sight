import React from "react"
import Navbar from "./Navbar"

type Page = "index" | "diary" | "entries" | "none"

export default function Layout({
  children,
  page,
}: {
  children: React.ReactNode
  page: Page
}) {
  return (
    <div className="h-full flex flex-col align-middle p-4 ">
      <div className="w-full flex-none mb-4">
        <Navbar page={page} />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  )
}
