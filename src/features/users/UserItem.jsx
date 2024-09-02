import styles from "./UserItem.module.css"
import { useNavigate } from "react-router-dom"

function UserItem({ user }) {
  const { _id, username, roles, status } = user

  const navigate = useNavigate()
  if (user) {
    return (
      <>
        <tr className={styles.user}>
          <td>{username}</td>
          <td>{roles}</td>

          <td>
            <button onClick={() => navigate(`/dash/users/${_id}`)}>Edit</button>
          </td>
        </tr>
      </>
    )
  } else {
    return null
  }
}
export default UserItem
