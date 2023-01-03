import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { DiaryEntry } from "../interfaces/DiaryEntry"
import { useAuthContext } from "./context/AuthContext"
import { db } from "./firebase/firebase"
import LoadingSpinner from "../assets/spinner.svg"

function DiaryForm() {
  const { user } = useAuthContext()
  const [diaryEntry, setDiaryEntry] = useState<string>("")
  const [diaryAnalysis, setDiaryAnalysis] = useState<string | null>(null)
  const [diaryBulletpoints, setDiaryBulletpoints] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (diaryBulletpoints.length > 0 && diaryAnalysis) {
      addEntry(diaryEntry)
    }
  }, [diaryBulletpoints, diaryAnalysis])

  async function addEntry(entryContent: string) {
    if (user) {
      const entry: Omit<DiaryEntry, "entryId"> = {
        content: entryContent,
        createdAt: Timestamp.now(),
        analysis: diaryAnalysis,
        bulletpoints: diaryBulletpoints,
      }

      await addDoc(collection(db, "users", user.uid, "entries"), {
        content: entry.content,
        createdAt: entry.createdAt,
        analysis: entry.analysis,
        bulletpoints: entry.bulletpoints,
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
              "There was an error, the AI could not generate a response. Please try again in 10 minutes."
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
      setDiaryAnalysis(analysis)
      setDiaryBulletpoints(splitSummaryFiltered)
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
