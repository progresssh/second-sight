import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { DiaryEntry } from "../interfaces/DiaryEntry.js"
import { db } from "./firebase/firebase.js"
import { useAuthContext } from "./context/AuthContext.js"
import DiaryItem from "./DiaryItem.js"
import spinner from "../assets/spinner.svg"
import Layout from "./Layout.js"

function DiaryEntryList() {
  const { user } = useAuthContext()

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[] | null>()
  const [snapshot, setSnapshot] = useState<QuerySnapshot | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setIsLoading(true)
      const query = collection(db, "users", user.uid, "entries")
      const unsubscribe = onSnapshot(query, (querySnapshot) =>
        setSnapshot(querySnapshot),
      )
      return () => unsubscribe()
    } else {
      setDiaryEntries([])
    }
  }, [user])

  useEffect(() => {
    if (snapshot) {
      const data: DiaryEntry[] = []
      snapshot.docs.map((doc) => {
        data.push({ entryId: doc.id, ...doc.data() } as DiaryEntry)
        data.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
      })
      setDiaryEntries(data)
      setIsLoading(false)
    }
  }, [snapshot])

  if (isLoading) {
    return (
      <div className="bg-[#232946] h-full flex justify-center items-center">
        <img src={spinner} className="w-36 " alt="Loading spinner" />
      </div>
    )
  }

  return (
    <Layout page="entries">
      {user && !isLoading && (
        <div>
          <ul className="space-y-6">
            {diaryEntries?.map((entry) => (
              <DiaryItem key={entry.entryId} entry={entry} />
            ))}
          </ul>
        </div>
      )}
    </Layout>
  )
}

export default DiaryEntryList
