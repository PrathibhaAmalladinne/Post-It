import { Link } from "react-router-dom"
import styles from "./Homepage.module.css"
// import styles2 from './../components/Logo.module.css'
import Logo from "../components/Logo"
function Homepage() {
  // const val = loggedout;
  return (
    <main className={styles.homepage}>
      <Link to="/about">
        <Logo />
      </Link>
      <section>
        <h1>Manage your notes</h1>
        <Link to="login" className="cta">
          Login to continue!
        </Link>
      </section>
    </main>
  )
}

export default Homepage
