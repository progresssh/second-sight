import {
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"

export default function Navbar({ page }: { page: string }) {
  const { user, logOut } = useAuthContext()

  switch (page) {
    case "index":
      return (
        <div className="flex flex-col ">
          <div className="flex flex-grow flex-shrink flex-row justify-around ">
            <div className="w-1/3 font-medium text-lg self-center text-[#B8C1EC]">
              <h1>Second Sight</h1>
            </div>

            <div className="text-end font-medium text-lg  text-[#B8C1EC]">
              <Link to={"/login"} className="space-x-4">
                <button className="font-base">Sign In</button>
                <button className=" bg-[#EEBBC3] text-[#232946] rounded-full px-3">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          <hr className="w-11/12 my-2 self-center opacity-20" />
        </div>
      )

    case "entries":
      return (
        <div className="flex flex-col ">
          <div className="flex flex-row justify-around ">
            <div className="w-1/3 text-[#B8C1EC]">
              <Link to={"/diary"}>
                <ArrowLeftIcon className="w-8" />
              </Link>
            </div>
            <div className=" w-1/3 self-center text-center font-medium text-lg text-[#B8C1EC]">
              <h1>Entries</h1>
            </div>
            <div className=" w-1/3 text-end font-medium text-lg text-[#EEBBC3]">
              {user && (
                <Link
                  to={"/"}
                  onClick={logOut}
                  className="flex space-x-2 justify-end"
                >
                  <button>Logout</button>
                  <ArrowRightOnRectangleIcon className="w-8" />
                </Link>
              )}
            </div>
          </div>
          <hr className="w-11/12 my-2 self-center opacity-20" />
        </div>
      )
    case "diary":
      return (
        <div className="flex flex-col ">
          <div className="flex flex-row justify-around items-center">
            <div className="w-auto"></div>
            <div className=" w-1/2 flex-grow md:text-center font-medium text-sm md:text-lg text-[#EEBBC3]">
              <h1>What would you like to tell me today?</h1>
            </div>
            <div className=" w-auto text-end font-medium text-sm md:text-lg text-[#EEBBC3]">
              <Link to={"/entries"} className="flex space-x-2 items-center">
                <span>{user?.displayName}</span>
                <UserCircleIcon className="w-8" />
              </Link>
            </div>
          </div>
          <hr className="w-11/12 my-2 self-center opacity-20" />
        </div>
      )
    default:
      return <div></div>
  }
}
