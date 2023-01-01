import { Problem } from "../interfaces/Problem"

function ProblemItem({ problem }: { problem: Problem }) {
  return (
    <li>
      <div>{problem.problemName}</div>
      <div>
        <ul className="text-blue-800 animate-pulse">
          {problem.summary.map((bulletpoint, i) => (
            <li key={i}>{bulletpoint}</li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default ProblemItem
