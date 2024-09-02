import { useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import { useState, useRef, useEffect } from "react"
import { useLogin } from "../hooks/useAuthData"
// import usePersist from "../hooks/usePersist"

function Login() {
  const navigate = useNavigate()
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState("test")
  const [password, setPassword] = useState("test123")
  const [errMsg, setErrMsg] = useState("")
  // const [persist, setPersist] = usePersist()

  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {
    setErrMsg("")
  }, [username, password])
  // const handleToggle = () => {
  //   setPersist((prev) => !prev)
  // }
  const loginMutation = useLogin()
  const credentials = { username, password }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await loginMutation.mutateAsync(credentials)
      setUsername("")
      setPassword("")
      navigate("/dash")
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response")
      } else if (err.response.status === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.response.status === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg(err.response.data?.message)
      }
      errRef.current.focus()
    }
  }
  return (
    <section className={styles.login}>
      <p ref={errRef} aria-live="assertive" className={styles.errmsg}>
        {errMsg}
      </p>
      {/* <h1>Login</h1> */}
      <form
        className={styles.form}
        onSubmit={handleLogin}
        // onSubmit={() => navigate("/dash")}
      >
        <div className={styles.row}>
          <label htmlFor="username">Username: </label>
          <input
            type="username"
            id="username"
            ref={userRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button className={styles.btn}>Login</button>
        </div>
        {/* <label htmlFor="persist">
          <input
            type="checkbox"
            className={styles.checkboxcontainer}
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          Trust this device
        </label> */}
      </form>
    </section>
  )
}

export default Login
