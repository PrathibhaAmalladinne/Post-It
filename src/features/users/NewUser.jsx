import { useState } from "react"
import styles from "./NewUser.module.css"
import { useAddNewUser } from "../../hooks/useUsersData"
import { useNavigate } from "react-router-dom"
function NewUser() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [roles, setRoles] = useState(["Employee"])

  const ROLES = {
    Employee: "Employee",
    Manager: "Manager",
    Admin: "Admin",
  }
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    )
  })
  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setRoles(values)
  }
  const { mutate: addNewUser } = useAddNewUser()
  const handleAddNewUser = (e) => {
    e.preventDefault()
    const newUser = { username, password, roles }
    const res = addNewUser(newUser)
    if (res === 401) {
      return <h1 className={styles.errmessage}>UNAUTHORIZED</h1>
    }
    console.log(newUser)
    navigate(`/dash/users`)
  }

  return (
    <>
      <form className={styles.form}>
        <div className={styles.titlerow}>
          <h1 className={styles.h2}>Add New User</h1>
        </div>
        <label htmlFor="username">Username:</label>
        <input
          className={styles.input}
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="user-password">password:</label>
        <textarea
          className={styles.inputtext}
          id="user-password"
          name="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></textarea>
        <label htmlFor="user-roles">Assigned Roles:</label>
        <select
          className={styles.select}
          id="roles"
          name="roles"
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>

        <div className={styles.divider}>
          <button className={styles.actionbuttons} onClick={handleAddNewUser}>
            SUBMIT
          </button>
        </div>
      </form>
    </>
  )
}

export default NewUser
