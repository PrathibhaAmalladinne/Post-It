import { NavLink } from "react-router-dom"
import styles from "./SideBar.module.css"
import useAuthorization from "../hooks/useAuthorization"
function SideBar() {
  const { isAdmin, isManager } = useAuthorization()
  return (
    <main className={styles.sidebar}>
      <ul>
        <li>
          <NavLink to="/dash/notes">Tech Notes</NavLink>
        </li>
        <li>
          <NavLink to="/dash/notes/new">Add a new note</NavLink>
        </li>
        <li>
          {(isAdmin || isManager) && (
            <NavLink to="/dash/users">User Settings</NavLink>
          )}
        </li>
        <li>
          {(isAdmin || isManager) && (
            <NavLink to="/dash/users/new">Add a new user</NavLink>
          )}
        </li>
      </ul>
    </main>
  )
}

export default SideBar
