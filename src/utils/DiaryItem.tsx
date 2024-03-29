import { DiaryEntry } from "../interfaces/DiaryEntry"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useAuthContext } from "./context/AuthContext"
import { db } from "./firebase/firebase"
import { deleteDoc, doc } from "firebase/firestore"
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
  const { user } = useAuthContext()

  async function deleteDocument(id: string) {
    if (user) {
      await deleteDoc(doc(db, "users", user.uid, "entries", id))
    }
  }

  function handleClickDelete() {
    deleteDocument(id)
    setIsOpen(false)
  }

  return (
    <Dialog
      className={"relative z-50"}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm p-4 border-4 border-button rounded bg-buttontext">
          <Dialog.Title className={"font-medium text-button"}>
            Delete Entry
          </Dialog.Title>

          <p className="py-4 text-[#B8C1EC]">
            Are you sure you want to delete this entry? All of your data will be
            permanently removed. This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-button hover:bg-red-400 text-buttontext font-medium py-2 px-4 rounded 
              transition
              ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-button  hover:bg-red-400 text-buttontext font-medium py-2 px-4 rounded 
              transition
              ease-in-out"
              onClick={handleClickDelete}
            >
              Delete
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
    <li className="text-paragraph whitespace-pre-wrap border-2 border-button rounded-lg p-4">
      <div className="flex justify-between">
        <time className="font-normal ">
          {entry.createdAt.toDate().toDateString()}
        </time>
        <button onClick={() => setIsOpen(true)}>
          <XMarkIcon
            className="              
              rounded
              transition
              ease-in-out
              hover:text-red-400
              h-6 w-6
              cursor-pointer
              "
          />
        </button>
      </div>

      <div className="flex flex-col space-y-4 mt-2 break-words">
        <p className="font-medium text-button">Key Points</p>
        <ul className="text-paragraph">
          {entry.bulletpoints.map((bulletpoint, i) => (
            <li key={i}>{bulletpoint}</li>
          ))}
        </ul>
        <p className="font-medium text-button">Entry</p>
        <div className="">{entry.content}</div>
      </div>
      <DeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} id={entry.entryId} />
    </li>
  )
}

export default DiaryItem
