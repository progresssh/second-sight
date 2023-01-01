import { useState } from "react"
import { FormProps } from "../interfaces/FormProps"
import { useAuthContext } from "./context/AuthContext"
import SigninButton from "./SigninButton"

function LoginForm() {
  const { user, signIn, signUp, logOut, authError, setAuthError } =
    useAuthContext()
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
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email">Enter your email:</label>
            <input
              type={"email"}
              name={"email"}
              placeholder="example@email.xyz"
            />
          </div>

          <div>
            <label htmlFor="password">Enter your password:</label>
            <input type={"password"} name={"password"} />
          </div>

          <div className="flex flex-col items-start">
            <SigninButton isSignedUp={isSignedUp} />
            {authError && (
              <span>{"Please enter a valid email and password"}</span>
            )}
            <span
              className="cursor-pointer"
              onClick={() => {
                setAuthError(null)
                setIsSignedUp(!isSignedUp)
              }}
            >
              {!isSignedUp
                ? "Already have an account? Click here to login."
                : "Don't have an account? Click here to sign up."}
            </span>
          </div>
        </form>
      )}

      {user && <button onClick={logOut}>Log out</button>}
    </>
  )
}

export default LoginForm
