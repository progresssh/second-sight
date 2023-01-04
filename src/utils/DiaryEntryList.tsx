import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { DiaryEntry } from "../interfaces/DiaryEntry.js"
import { db } from "./firebase/firebase.js"
import { useAuthContext } from "./context/AuthContext.js"
import DiaryItem from "./DiaryItem.js"

function DiaryEntryList() {
  const { user } = useAuthContext()

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[] | null>()
  const [snapshot, setSnapshot] = useState<QuerySnapshot | null>(null)

  useEffect(() => {
    if (user) {
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
    }
  }, [snapshot])

  return (
    <>
      {user && (
        <div>
          <h2 className="p-2 mb-4 text-center  text-white font-bold italic bg-green-500 rounded">
            {`Diary Entries: ${diaryEntries?.length}`}
          </h2>
          <ul className="space-y-6">
            {diaryEntries?.map((entry) => (
              <DiaryItem key={entry.entryId} entry={entry} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default DiaryEntryList
