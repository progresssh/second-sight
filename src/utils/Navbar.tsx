import { useAuthContext } from "./context/AuthContext"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

export default function Navbar() {
  const { user, logOut } = useAuthContext()

  return (
    <div className="flex justify-between">
      <div className="">
        <h1>Second Sight</h1>
      </div>
      <div className="flex ">
        {user && <div>Hi, {user.displayName}</div>}
        {user && (
          <button onClick={logOut} className="px-2">
            <ArrowRightOnRectangleIcon className="h-6 w-6 text-blue-500" />
          </button>
        )}
      </div>
    </div>
  )
}
