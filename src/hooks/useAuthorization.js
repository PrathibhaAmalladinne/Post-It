import { useAuth } from "../context/AuthContext"
import { jwtDecode } from "jwt-decode"

const useAuthorization = () => {
  const token = useAuth()
  let isManager = false
  let isAdmin = false
  let status = "Employee"
  // console.log("currthhkj", token.token)

  if (token?.token) {
    const decoded = jwtDecode(token.token)

    const { username, roles } = decoded.UserInfo

    isManager = roles.includes("Manager")
    isAdmin = roles.includes("Admin")

    if (isManager) status = "Manager"
    if (isAdmin) status = "Admin"

    return { username, roles, status, isManager, isAdmin }
  }
  return { username: "", roles: [], isManager, isAdmin, status }
}

export default useAuthorization
