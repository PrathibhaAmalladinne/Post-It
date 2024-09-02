import useAuthorization from "../hooks/useAuthorization"
import styles from "./Welcome.module.css"
function Weolcome() {
  const { username, isAdmin, isManager } = useAuthorization()
  const date = new Date()
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date)

  return (
    <div className={styles.welcome}>
      <h2>It's {today}</h2>
      <h1> Welcome {username}!</h1>
    </div>
  )
}

export default Weolcome
