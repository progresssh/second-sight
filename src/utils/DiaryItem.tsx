import { DiaryEntry } from "../interfaces/DiaryEntry"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useAuthContext } from "./context/AuthContext"
import { useState } from "react"
import { Dialog } from "@headlessui/react"

function DeleteDialog({
  setIsOpen,
  isOpen,
  id,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  id: string
}) {
  const { deleteDocument } = useAuthContext()
  return (
    <Dialog
      className={"relative z-50"}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm p-4 rounded bg-white">
          <Dialog.Title className={"font-bold"}>Delete Entry</Dialog.Title>

          <p className="py-4">
            Are you sure you want to delete this entry? All of your data will be
            permanently removed. This action cannot be undone.
          </p>

          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                deleteDocument(id)
                setIsOpen(false)
              }}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

function DiaryItem({ entry }: { entry: DiaryEntry }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="whitespace-pre-wrap border rounded p-4">
      <div className="flex justify-between">
        <time className="italic">
          {entry.createdAt.toDate().toDateString()}
        </time>
        <button onClick={() => setIsOpen(true)}>
          <XMarkIcon
            className="              
              rounded
              transition
              ease-in-out
              hover:text-red-600
              h-6 w-6
              cursor-pointer
              "
          />
        </button>
      </div>

      <div className="flex flex-col">
        <div className="py-4">{entry.content}</div>
        <p className="italic text-blue-800">Key points</p>
        <ul className="">
          {entry.bulletpoints.map((bulletpoint, i) => (
            <li key={i}>{bulletpoint}</li>
          ))}
        </ul>
        {/* <div className="py-4 ">
          <p className="italic text-blue-800">Word from a friend</p>
          <p className="">{entry.analysis}</p>
          <div></div>
        </div> */}
      </div>
      <DeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} id={entry.entryId} />
    </li>
  )
}

export default DiaryItem
