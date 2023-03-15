import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth"

import app from "../firebase/firebase"
import { FormProps } from "../../interfaces/FormProps"

interface AuthHook {
  signIn: (formProps: FormProps) => void
  signUp: (formProps: FormProps) => void
  logOut: () => void
  setAuthError: Dispatch<SetStateAction<AuthError | null>>
  signInGoogle: () => void
  user: User | null | undefined
  authError: AuthError | null
}

const AuthContext = createContext<AuthHook | null>(null)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuthContext must be within AuthContextProvider")
  }

  return context
}

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const [user, setUser] = useState<User | null>()
  const [authError, setAuthError] = useState<AuthError | null>(null)

  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        setUser(user)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        setAuthError(errorCode)
      })
  }

  function signIn(formProps: FormProps) {
    setAuthError(null)
    signInWithEmailAndPassword(auth, formProps.email, formProps.password).catch(
      (error: AuthError) => setAuthError(error),
    )
  }

  function signUp(formProps: FormProps) {
    setAuthError(null)
    createUserWithEmailAndPassword(auth, formProps.email, formProps.password)
      .then((usr) =>
        updateProfile(usr.user, { displayName: formProps.nickname }),
      )
      .catch((error: AuthError) => setAuthError(error))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) =>
      setUser(authenticatedUser),
    )

    return () => unsubscribe()
  }, [])

  function logOut() {
    setAuthError(null)
    signOut(auth)
      .then(() => {
        console.log("log out successful")
      })
      .catch((error: AuthError) => setAuthError(error))
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signInGoogle,
        signUp,
        logOut,
        setAuthError,
        user,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
