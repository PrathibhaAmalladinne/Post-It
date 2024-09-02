import styles from "./NoteItem.module.css"
import { useNavigate } from "react-router-dom"

function NoteItem({ note }) {
  const { _id, title, createdAt, updatedAt, username, completed } = note
  const navigate = useNavigate()

  if (note) {
    return (
      <tr className={styles.note}>
        <td>{title}</td>
        <td>{username}</td>
        <td>
          {completed ? (
            <p className={styles.closed}>Closed</p>
          ) : (
            <p className={styles.open}>Open</p>
          )}
        </td>
        <td>{createdAt}</td>
        <td>{updatedAt}</td>
        <td>
          {/* <Link to={`/dash/notes/${note._id}`}> */}
          <button onClick={() => navigate(`/dash/notes/${_id}`)}>Edit</button>
          {/* </Link> */}
        </td>
      </tr>
    )
  } else {
    return null
  }
}
export default NoteItem
