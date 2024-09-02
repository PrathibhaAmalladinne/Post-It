import styles from "./Footer.module.css"
import useAuthorization from "../hooks/useAuthorization"
import { useNavigate } from "react-router-dom"
// import { useEffect, useState } from "react"

function Footer() {
  const { username, status } = useAuthorization()
  //   const [user, setUser] = useState("")
  //   const [statusUser, setStatusUser] = useState("Employee")
  const navigate = useNavigate()
  //   useEffect(() => {
  //     setUser(username)
  //     setStatusUser(status)
  //   }, [username, status])
  const handleClick = () => {
    navigate(`/dash`)
  }
  return (
    <footer className={styles.footer}>
      <button onClick={handleClick}>🏠{"   "}</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current User :&nbsp;&nbsp;
      <strong>{username}</strong>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status :&nbsp;&nbsp;
      <strong>{status}</strong>
    </footer>
  )
}

export default Footer
