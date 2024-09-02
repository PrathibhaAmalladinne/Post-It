import { createContext, useContext, useRef, useState } from "react"
//CREATE CONTEXT
export const AuthContext = createContext()

function AuthContextProvider({ children }) {
  const [token, setToken] = useState("null")
  // let refValue = useRef("null")

  const setCredentials = (accessToken) => {
    setToken(accessToken)
  }
  console.log("all tokens are token", token)
  return (
    <AuthContext.Provider
      value={{
        setCredentials,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
function useAuth() {
  const context = useContext(AuthContext)
  // if (context === undefined) throw new error("UNDEFINED CONTEXT")
  return context
}
export { useAuth, AuthContextProvider }
