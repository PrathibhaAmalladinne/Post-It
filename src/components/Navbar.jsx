import { Link, useNavigate } from "react-router-dom"
import Logo from "./Logo"
import styles from "./Navbar.module.css"
import { useSendLogout } from "../hooks/useAuthData"

function Navbar() {
  const navigate = useNavigate()
  const { mutate: nothing } = useSendLogout()
  const handleLogout = (e) => {
    e.preventDefault()
    nothing(null)
    navigate(`/`)
  }

  return (
    <nav className={styles.nav}>
      <Link to="/dash">
        <Logo />
      </Link>
      <ul>
        <li className="cta">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
