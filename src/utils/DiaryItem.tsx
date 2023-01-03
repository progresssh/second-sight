import { DiaryEntry } from "../interfaces/DiaryEntry"

function DiaryItem({ entry }: { entry: DiaryEntry }) {
  return (
    <li>
      <div>{entry.content}</div>
      <div>
        <p className="text-green-800 animate-pulse">{entry.analysis}</p>
      </div>
      <div>
        <ul className="text-blue-800 animate-pulse">
          {entry.bulletpoints.map((bulletpoint, i) => (
            <li key={i}>{bulletpoint}</li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default DiaryItem
