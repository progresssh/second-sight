import { AuthError } from "firebase/auth"

export default function AuthErrorMessage({
  authError,
}: {
  authError: AuthError
}) {
  const errorMessage = () => {
    switch (authError.code) {
      case "auth/weak-password":
        return "Password must have at least 6 characters."
      case "auth/email-already-in-use":
        return "Email already has an account."
      case "auth/user-not-found" || "auth/wrong-password":
        return "Invalid credentials"
    }
  }
  console.log(authError.code)
  return <span className="text-red-500 font-bold">{errorMessage()}</span>
}
