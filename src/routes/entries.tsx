import { useAuthContext } from "../utils/context/AuthContext"
import DiaryEntryList from "../utils/DiaryEntryList"
import CustomErrorPage from "../utils/CustomErrorPage"

export default function Entries() {
  const { user } = useAuthContext()

  if (user === null) {
    return (
      <CustomErrorPage
        code="401"
        error="You must be logged in to access this page."
      />
    )
  }

  return <DiaryEntryList />
}
