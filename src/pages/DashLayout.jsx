import styles from "./DashLayout.module.css"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"
import Footer from "../components/Footer"
import Welcome from "../components/Welcome"
import { Outlet, useLocation } from "react-router-dom"
function DashLayout() {
  const { pathname } = useLocation()
  return (
    <main className={styles.app}>
      <Navbar />
      <SideBar />
      {pathname === "/dash" ? <Welcome /> : <Outlet />}
      <Footer className={styles.footer} />
    </main>
  )
}

export default DashLayout
