import { useState } from "react"
import { useNavigate } from "react-router-dom"
import App from "../App"
import { useAuthContext } from "../utils/context/AuthContext"

export default function Root() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  if (user) {
    navigate("/diary")
  }

  setIsLoading(false)

  return !isLoading ? <App /> : <div>hey</div>
}
