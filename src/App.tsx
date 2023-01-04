import LoginForm from "./utils/LoginForm"
import DiaryForm from "./utils/DiaryForm"
import DiaryEntryList from "./utils/DiaryEntryList"
import Layout from "./utils/Layout"

function App() {
  return (
    <>
      <Layout>
        <LoginForm />
        <DiaryForm />
        <DiaryEntryList />
      </Layout>
    </>
  )
}

export default App
