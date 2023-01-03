import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { DiaryEntry } from "../interfaces/DiaryEntry"
import { useAuthContext } from "./context/AuthContext"
import { db } from "./firebase/firebase"
import LoadingSpinner from "../assets/spinner.svg"

function DiaryForm() {
  const { user } = useAuthContext()
  const [diaryEntry, setDiaryEntry] = useState<string>("")
  const [diarySummary, setDiarySummary] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (diarySummary.length > 0) {
      addEntry(diaryEntry)
    }
  }, [diarySummary])

  async function addEntry(entryContent: string) {
    if (user) {
      const entry: Omit<DiaryEntry, "entryId"> = {
        content: entryContent,
        createdAt: Timestamp.now(),
        summary: diarySummary,
      }

      await addDoc(collection(db, "users", user.uid, "entries"), {
        content: entry.content,
        createdAt: entry.createdAt,
        summary: entry.summary,
      })
    } else {
      throw new Error(
        "Must be logged in to add a new problem OR there was a problem with AI diary summarization.",
      )
    }
    setIsLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const {
      analysis,
      bulletpoints,
    }: { analysis: string; bulletpoints: string } = await fetch(
      "https://secondsightbacksyfr1vrq-first.functions.fnc.fr-par.scw.cloud/",
      {
        method: "POST",
        body: JSON.stringify({ diary: diaryEntry }),
      },
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
        return (
          <span>
            {
              "There was an error, the AI could not generate a response. Please try again."
            }
          </span>
        )
      })

    if (bulletpoints) {
      const summary = bulletpoints
      const splitSummary = summary.split("\n")
      const splitSummaryFiltered = splitSummary.filter(
        (bulletpoint) => bulletpoint.length > 0,
      )

      setDiarySummary(splitSummaryFiltered)
    }
  }

  return (
    <>
      {user && (
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          {!isLoading && (
            <textarea
              name={"diaryContent"}
              className="w-3/6 h-auto  border-gray-700 border"
              onChange={(e) => setDiaryEntry(e.target.value)}
              placeholder="This is your diary, write some thoughts, anything you want..."
              value={diaryEntry}
            />
          )}

          <div>
            {isLoading ? (
              <img src={LoadingSpinner} alt="A loading spinner" />
            ) : (
              <input type="submit" name={"submit"} value="Submit Entry" />
            )}
          </div>
        </form>
      )}
    </>
  )
}

export default DiaryForm
