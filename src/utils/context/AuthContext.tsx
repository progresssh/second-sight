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
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth"

import app, { db } from "../firebase/firebase"
import { FormProps } from "../../interfaces/FormProps"
import { deleteDoc, doc } from "firebase/firestore"

interface AuthHook {
  signIn: (formProps: FormProps) => void
  signUp: (formProps: FormProps) => void
  logOut: () => void
  deleteDocument: (id: string) => void
  user: User | null | undefined
  authError: AuthError | null
  setAuthError: Dispatch<SetStateAction<AuthError | null>>
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

  const [user, setUser] = useState<User | null>()
  const [authError, setAuthError] = useState<AuthError | null>(null)

  function signIn(formProps: FormProps) {
    setAuthError(null)
    signInWithEmailAndPassword(auth, formProps.email, formProps.password).catch(
      (error: AuthError) => setAuthError(error),
    )
  }

  async function deleteDocument(id: string) {
    if (user) {
      await deleteDoc(doc(db, "users", user.uid, "entries", id))
    }
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
        signUp,
        logOut,
        setAuthError,
        deleteDocument,
        user,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
