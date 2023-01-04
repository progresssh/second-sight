import React from "react"
import Navbar from "./Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col align-middle p-4">
      <div className="w-full flex-none  ">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  )
}
