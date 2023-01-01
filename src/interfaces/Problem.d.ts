import { Timestamp } from "firebase/firestore"

export interface Problem {
  createdAt: Timestamp
  problemName: string
  problemId: string
  summary: string[]
}
