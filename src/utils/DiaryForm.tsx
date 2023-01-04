import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { DiaryEntry } from "../interfaces/DiaryEntry"
import { useAuthContext } from "./context/AuthContext"
import { db } from "./firebase/firebase"
import LoadingSpinner from "../assets/spinner.svg"

function DiaryForm() {
  const { user } = useAuthContext()
  const [diaryEntry, setDiaryEntry] = useState<string>("")
  const [diaryAnalysis, setDiaryAnalysis] = useState<{
    analysis: string
    bulletpoints: string[]
  }>({ analysis: "", bulletpoints: [""] })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (diaryAnalysis) {
      addEntry(diaryEntry)
    }
  }, [diaryAnalysis])

  async function addEntry(entryContent: string) {
    if (user && diaryAnalysis.analysis.length > 0) {
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
    } else {
      throw new Error("There was a problem with AI diary summarization.")
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
          className="flex flex-col w-full justify-center align-middle"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mx-4 my-8 md:mx-48 h-full flex flex-col ">
            <textarea
              name={"diaryContent"}
              required
              className="
              h-1/2
              px-3
              py-1.5
              text-base
              font-normal
            text-gray-700
            bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              
              
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              rows={12}
              onChange={(e) => setDiaryEntry(e.target.value)}
              placeholder="This is your diary, write some thoughts, anything you want..."
              value={diaryEntry}
            />

            {isLoading ? (
              <button
                type="submit"
                disabled
                name={"submit"}
                value="Submit Entry"
                className="cursor-not-allowed bg-blue-500 w-1/2 m-2 xl:w-1/6 self-center flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <img src={LoadingSpinner} alt="A loading spinner" />
              </button>
            ) : (
              <button
                className="bg-blue-500 w-1/2 m-2 xl:w-1/6 self-center flex justify-center items-center  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                name={"submit"}
                value="Submit Entry"
              >
                Submit Entry
              </button>
            )}
          </div>
        </form>
      )}
    </>
  )
}

export default DiaryForm
