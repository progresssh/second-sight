import { useAuthContext } from "./utils/context/AuthContext"
import LoginForm from "./utils/LoginForm"
import ProblemForm from "./utils/ProblemForm"
import ProblemList from "./utils/ProblemList"

function App() {
  const { user } = useAuthContext()

  return (
    <div>
      <h1>Second Sight</h1>
      <h2 className="text-xl">
        {user ? user.email : "Please Sign up or Log in"}
      </h2>
      <LoginForm />
      <ProblemForm />
      <ProblemList />
    </div>
  )
}

export default App
