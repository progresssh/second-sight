import { useState } from "react"
import { FormProps } from "../interfaces/FormProps"
import AuthErrorMessage from "./AuthErrorMessage"
import { useAuthContext } from "./context/AuthContext"

function LoginForm() {
  const { user, signIn, signUp, authError, setAuthError } = useAuthContext()
  const [isSignedUp, setIsSignedUp] = useState(true)

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

  return (
    <>
      {!user && (
        <div className="flex flex-col h-full items-center justify-center">
          <form
            className="max-w-xs w-80 flex flex-col space-y-8 items-center justify-center 
          bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <p>Log in to your account</p>
            {!isSignedUp && (
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Nickname
                </label>
                <input
                  className="shadow appearance-none border focus:border-blue-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type={"text"}
                  name={"nickname"}
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border focus:border-blue-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={"email"}
                autoComplete="true"
                name={"email"}
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Password
              </label>
              <input
                type={"password"}
                name={"password"}
                autoComplete="true"
                className="shadow appearance-none border focus:border-blue-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={"******************"}
              />
            </div>

            <div className="flex flex-col items-center ">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                {isSignedUp ? "Log In" : "Register"}
              </button>
              {authError && <AuthErrorMessage authError={authError} />}
              <span
                className="cursor-pointer text-xs text-gray-400 pt-4"
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
      )}
    </>
  )
}

export default LoginForm
