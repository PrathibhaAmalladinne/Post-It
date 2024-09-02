import { useState } from "react"
import { useAddNewNote } from "../../hooks/useNotesData"
import styles from "./NewNoteForm.module.css"
import { useNavigate } from "react-router-dom"
import useAuthorization from "../../hooks/useAuthorization"

function NewNoteForm({ users }) {
  const { username, isAdmin, isManager } = useAuthorization()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const currUser = users.filter((user) => user.username === username)
  const [userId, setUserId] = useState(currUser[0]._id)
  const onUserChanged = (e) => {
    setUserId(e.target.value)
  }
  const onTextChanged = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }
  const onTitleChanged = (e) => {
    e.preventDefault()
    setTitle(e.target.value)
  }
  const { mutate: addNewNote } = useAddNewNote()
  const handleAddNewNote = (e) => {
    e.preventDefault()
    const newNote = { user: userId, title, text }
    addNewNote(newNote)
    // console.log(newNote)
    navigate(`/dash/notes`)
  }

  return (
    <>
      <form className={styles.form}>
        <div className={styles.titlerow}>
          <h1 className={styles.h2}>New Note</h1>
        </div>
        <label className={styles.label} htmlFor="note-title">
          Title:
        </label>
        <input
          id="note-title"
          name="title"
          type="text"
          value={title}
          onChange={onTitleChanged}
        />
        <label className={styles.label} htmlFor="note-text">
          Text:
        </label>
        <input
          className={styles.inputtext}
          id="note-text"
          name="text"
          type="text"
          value={text}
          onChange={onTextChanged}
        />
        {(isManager || isAdmin) && (
          <>
            <label className={styles.label} htmlFor="note-username">
              Assigned To:
            </label>

            <select
              className={styles.select}
              id="note-username"
              name="username"
              value={userId}
              onChange={onUserChanged}
            >
              {users?.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                )
              })}
            </select>
          </>
        )}

        <div className={styles.divider}>
          <button onClick={handleAddNewNote} className={styles.actionbuttons}>
            SUBMIT
          </button>
        </div>
      </form>
    </>
  )
}

export default NewNoteForm
