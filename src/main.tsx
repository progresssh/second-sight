import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthContextProvider from "./utils/context/AuthContext"
import Root from "./routes/root"
import ErrorPage from "./routes/error"
import Entries from "./routes/entries"
import Login from "./routes/login"
import Diary from "./routes/diary"

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
  },
  {
    path: "entries",
    element: <Entries />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "diary",
    element: <Diary />,
  },
])

ReactDOM.createRoot(
  document.getElementById("react-root") as HTMLElement,
).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
