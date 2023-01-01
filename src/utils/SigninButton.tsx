export default function SigninButton({ isSignedUp }: { isSignedUp: boolean }) {
  return <button type="submit">{isSignedUp ? "Sign In" : "Sign Up"}</button>
}
