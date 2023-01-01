import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Problem } from "../interfaces/Problem.js"
import { db } from "./firebase/firebase.js"
import ProblemItem from "./ProblemItem.js"
import { useAuthContext } from "./context/AuthContext.js"

function ProblemList() {
  const { user } = useAuthContext()

  const [problems, setProblems] = useState<Problem[] | null>()
  const [snapshot, setSnapshot] = useState<QuerySnapshot | null>(null)

  useEffect(() => {
    if (user) {
      const query = collection(db, "users", user.uid, "problems")
      const unsubscribe = onSnapshot(query, (querySnapshot) =>
        setSnapshot(querySnapshot),
      )
      return () => unsubscribe()
    } else {
      setProblems([])
    }
  }, [user])

  useEffect(() => {
    if (snapshot) {
      const data: Problem[] = []
      snapshot.docs.map((doc) => {
        data.push({ problemId: doc.id, ...doc.data() } as Problem)
        data.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
      })
      setProblems(data)
    }
  }, [snapshot])

  return (
    <>
      {user && (
        <ul>
          {problems?.map((problem) => (
            <ProblemItem key={problem.problemId} problem={problem} />
          ))}
        </ul>
      )}
    </>
  )
}

export default ProblemList
