import { useAuthContext } from "./utils/context/AuthContext"
import LoginForm from "./utils/LoginForm"
import DiaryForm from "./utils/DiaryForm"
import DiaryEntryList from "./utils/DiaryEntryList"

function App() {
  const { user } = useAuthContext()

  return (
    <div>
      <h1>Second Sight</h1>
      <h2 className="text-xl">
        {user ? user.email : "Please Sign up or Log in"}
      </h2>
      <LoginForm />
      <DiaryForm />
      <DiaryEntryList />
    </div>
  )
}

export default App
