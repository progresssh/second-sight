import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Diary from "../routes/diary"
import Entries from "../routes/entries"
import ErrorPage from "../routes/error"
import Login from "../routes/login"
import Root from "../routes/root"
import AuthContextProvider from "../utils/context/AuthContext"
import "../index.css"

export { render }

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
  },
  {
    path: "/entries",
    element: <Entries />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/diary",
    element: <Diary />,
  },
])

async function render() {
  ReactDOM.createRoot(
    document.getElementById("react-root") as HTMLElement,
  ).render(
    <React.StrictMode>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </React.StrictMode>,
  )
}
