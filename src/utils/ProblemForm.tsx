import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Problem } from "../interfaces/Problem"
import { useAuthContext } from "./context/AuthContext"
import { db } from "./firebase/firebase"
import LoadingSpinner from "../assets/spinner.svg"

function ProblemForm() {
  const { user } = useAuthContext()
  const [problemName, setProblemName] = useState<string>("")
  const [problemSummary, setProblemSummary] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (problemSummary.length > 0) {
      addProblem(problemName)
    }
  }, [problemSummary])

  async function addProblem(problemName: string) {
    if (user) {
      const problem: Omit<Problem, "problemId"> = {
        problemName: problemName,
        createdAt: Timestamp.now(),
        summary: problemSummary,
      }

      await addDoc(collection(db, "users", user.uid, "problems"), {
        createdAt: problem.createdAt,
        problemName: problem.problemName,
        summary: problem.summary,
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
        body: JSON.stringify({ diary: problemName }),
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

      setProblemSummary(splitSummaryFiltered)
    }
  }

  return (
    <>
      {user && (
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="problemName">Name a problem:</label>
          </div>
          {!isLoading && (
            <textarea
              name={"problem"}
              className="w-3/6 h-auto  border-gray-700 border"
              onChange={(e) => setProblemName(e.target.value)}
              placeholder="Write some thoughts.. What you are going through, what you think of yourself.. Anything you want."
              value={problemName}
            />
          )}

          <div>
            {isLoading ? (
              <img src={LoadingSpinner} alt="A loading spinner" />
            ) : (
              <input type="submit" name={"submit"} value="Add Problem" />
            )}
          </div>
        </form>
      )}
    </>
  )
}

export default ProblemForm
