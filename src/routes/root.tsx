import { useNavigate } from "react-router-dom"
import App from "../App"
import { useAuthContext } from "../utils/context/AuthContext"

export default function Root() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  if (user) {
    navigate("/diary")
  }
  return <App />
}
