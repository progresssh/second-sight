import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { DiaryEntry } from "../interfaces/DiaryEntry"
import { useAuthContext } from "./context/AuthContext"
import { db } from "./firebase/firebase"
import LoadingSpinner from "../assets/spinner.svg"
import { Link, useNavigate } from "react-router-dom"

function DiaryForm() {
  const { user } = useAuthContext()
  const [diaryEntry, setDiaryEntry] = useState<string>("")
  const [diaryAnalysis, setDiaryAnalysis] = useState<{
    analysis: string
    bulletpoints: string[]
  } | null>(null)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useNavigate()

  useEffect(() => {
    if (diaryAnalysis) {
      addEntry(diaryEntry)
    }
  }, [diaryAnalysis])

  async function addEntry(entryContent: string) {
    if (user && diaryAnalysis) {
      const entry: Omit<DiaryEntry, "entryId"> = {
        content: entryContent,
        createdAt: Timestamp.now(),
        analysis: diaryAnalysis.analysis,
        bulletpoints: diaryAnalysis.bulletpoints,
      }

      await addDoc(collection(db, "users", user.uid, "entries"), {
        content: entry.content,
        createdAt: entry.createdAt,
        analysis: entry.analysis,
        bulletpoints: entry.bulletpoints,
      })
      router("/entries")
    } else {
      setFetchError(true)
      throw new Error("There was a problem with AI diary summarization.")
    }

    setIsLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFetchError(false)
    setIsLoading(true)

    const {
      analysis,
      bulletpoints,
    }: { analysis: string; bulletpoints: string } = await fetch(
      "https://us-central1-beyond-c30ac.cloudfunctions.net/helloWorld",
      {
        method: "POST",
        body: JSON.stringify({ diary: diaryEntry }),
      },
    )
      .then((response) => response.json())
      .catch((error) => {
        setFetchError(true)
        console.error(error)
      })

    if (bulletpoints) {
      const summary = bulletpoints
      const splitSummary = summary.split("\n")
      const splitSummaryFiltered = splitSummary.filter(
        (bulletpoint) => bulletpoint.length > 0,
      )

      const analysisFiltered = analysis.replaceAll("Answer: ", "").trim()

      setDiaryAnalysis({
        analysis: analysisFiltered,
        bulletpoints: splitSummaryFiltered,
      })
    }
  }

  return (
    <>
      {user && (
        <form
          className="flex flex-col h-full w-full justify-center align-middle"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mx-4 self-center w-full h-full md:w-4/6 flex flex-col ">
            <textarea
              name={"diaryContent"}
              required
              className="flex-grow h-full w-full px-3 py-1.5 text-xl font-normal text-paragraph bg-buttontext bg-clip-padding resize-none transition placeholder-white-700 ease-in-out focus:outline-none"
              onChange={(e) => setDiaryEntry(e.target.value)}
              autoFocus
              value={diaryEntry}
            />

            {isLoading ? (
              <button
                type="submit"
                disabled
                name={"submit"}
                value="Submit Entry"
                className="cursor-not-allowed bg-button w-1/2 m-2 mb-4 xl:w-1/6 self-center flex justify-center items-center hover:bg-red-300 text-background font-medium py-2 px-4 rounded"
              >
                <img src={LoadingSpinner} alt="A loading spinner" />
              </button>
            ) : (
              <button
                className=" bg-button w-1/2 h-12 m-2 mb-4 xl:w-1/6 self-center flex justify-center items-center  hover:bg-red-300 text-background font-medium py-2 px-4 rounded transition ease-in"
                type="submit"
                name={"submit"}
                value="Submit Entry"
              >
                Submit Entry
              </button>
            )}
            {fetchError && (
              <Link to={"/"} className="self-center">
                <button className="text-center text-red-600">
                  There was an error, please copy your entry, and click here to
                  try again.
                </button>
              </Link>
            )}
          </div>
        </form>
      )}
    </>
  )
}

export default DiaryForm
