import { useState } from "react"
import styles from "./EditUserForm.module.css"
import { useDeleteUser, useUpdateUser } from "../../hooks/useUsersData"
import { useNavigate } from "react-router-dom"

function EditUserForm({ user }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState("")
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)
  const id = user._id
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
  const onActiveChanged = () => {
    setActive((prev) => !prev)
  }
  const { mutate: updateUser } = useUpdateUser()
  const handleUpdateUser = (e) => {
    e.preventDefault()
    const updatedUser = {
      id,
      username,
      roles,
      active,
      password,
    }
    console.log(updatedUser)
    updateUser(updatedUser)
    navigate(`/dash/users`)
  }
  const { mutate: deleteUser } = useDeleteUser()
  const handleDeleteUser = (e) => {
    e.preventDefault()
    const userId = user._id
    deleteUser(userId)
    console.log(userId)
    navigate(`/dash/users`)
  }

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.titlerow}>
        <h1 className={styles.h2}>Edit User # {username}</h1>
        <div className={styles.actionbuttons}>
          <button title="Save" onClick={handleUpdateUser}>
            SAVE
          </button>
          <button title="delete" onClick={handleDeleteUser}>
            DELETE
          </button>
        </div>
      </div>
      <label className={styles.label} htmlFor="user-name">
        Username:
      </label>
      <input
        className={styles.input}
        id="user-name"
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className={styles.label} htmlFor="password">
        Password:
      </label>
      <input
        className={styles.input}
        id="password"
        name="password"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className={styles.row}>
        <div className={styles.divider}>
          <label className={styles.checkboxcontainer} htmlFor="user-active">
            Active:
            <input
              className={styles.checkbox}
              id="user-active"
              name="user-active"
              type="checkbox"
              value={active}
              onChange={onActiveChanged}
            />
          </label>
          <label className={styles.label} htmlFor="user-roles">
            Role(s):
          </label>
          <select
            className={styles.select}
            id="user-roles"
            name="user-roles"
            multiple={true}
            size="3"
            value={roles}
            onChange={onRolesChanged}
          >
            {options}
          </select>
        </div>
      </div>
    </form>
  )
}

export default EditUserForm
