import { Timestamp } from "firebase/firestore"

export interface DiaryEntry {
  createdAt: Timestamp
  content: string
  entryId: string
  summary: string[]
}
