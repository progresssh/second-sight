import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { FormProps } from "../interfaces/FormProps"

import { useAuthContext } from "./context/AuthContext"

function LoginForm() {
  const { user, signIn, signUp, authError, setAuthError } = useAuthContext()
  const [isSignedUp, setIsSignedUp] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    switch (authError?.code) {
      case "auth/weak-password":
        setErrorMessage("Password must have at least 6 characters.")
        break
      case "auth/email-already-in-use":
        setErrorMessage("Email already has an account.")
        break
      case "auth/user-not-found" || "auth/wrong-password":
        setErrorMessage("Invalid credentials")
        break
    }
  }, [authError])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const formProps = Object.fromEntries(formData) as FormProps

    if (isSignedUp) {
      signIn(formProps)
    } else {
      signUp(formProps)
    }
  }

  if (user) {
    return <Navigate to={"/diary"} />
  }

  return (
    <>
      <div className="flex flex-col h-full items-center justify-center">
        <p className="font-normal text-3xl text-[#FFFFFE] mb-8">
          Log in to Second Sight
        </p>
        <form
          className="max-w-xs w-80 flex flex-col space-y-8 items-center justify-center 
          bg-[#EEBBC3]  shadow-md rounded p-8 mb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          {!isSignedUp && (
            <div>
              <label
                className="block text-[#232946] text-lg font-normal mb-2"
                htmlFor="username"
              >
                Nickname
              </label>
              <input
                className="shadow appearance-none border focus:border-[#232946] rounded w-full py-2 px-3 text-[#232946] leading-tight focus:outline-none focus:shadow-outline"
                type={"text"}
                name={"nickname"}
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label
              className="block text-[#232946] text-lg font-normal mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border focus:border-[#232946] rounded w-full py-2 px-3 text-[#232946] leading-tight focus:outline-none focus:shadow-outline"
              type={"email"}
              autoComplete="true"
              name={"email"}
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label
              className="block text-lg text-[#232946] font-normal mb-2"
              htmlFor="username"
            >
              Password
            </label>
            <input
              type={"password"}
              name={"password"}
              autoComplete="true"
              className="shadow appearance-none border focus:border-[#232946] rounded w-full py-2 px-3 text-[#232946] mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={"******************"}
            />
          </div>

          <div className="flex flex-col items-center ">
            <button
              type="submit"
              className="bg-[#232946] hover:bg-[#1b2038] text-xl text-white font-medium py-2 px-6 rounded"
            >
              {isSignedUp ? "Log In" : "Register"}
            </button>
            {authError && <span className="text-red-500">{errorMessage}</span>}
            <span
              className="cursor-pointer text-xs text-[#232946] mt-8"
              onClick={() => {
                setAuthError(null)
                setIsSignedUp(!isSignedUp)
              }}
            >
              {!isSignedUp
                ? "Already have an account? Click here to login."
                : "Don't have an account? Click here to register."}
            </span>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginForm
