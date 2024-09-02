import styles from "./EditNoteForm.module.css"
import { useState } from "react"
import { useDeleteNote, useUpdateNote } from "../../hooks/useNotesData"
// import { useUsersData } from "../../hooks/useUsersData"
import { useNavigate } from "react-router-dom"
import useAuthorization from "../../hooks/useAuthorization"

function EditNoteForm({ note, users }) {
  const { username, isAdmin, isManager } = useAuthorization()
  const navigate = useNavigate()
  console.log(note)
  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)
  const [userId, setUserId] = useState(note.user)
  const initial = note.user
  const onCompletedChanged = () => {
    setCompleted((prev) => !prev)
  }
  const onUserChanged = (e) => {
    setUserId(e.target.value)
  }
  const { mutate: updateNote } = useUpdateNote()
  const handleUpdateNote = (e) => {
    e.preventDefault()
    const updatedNote = {
      id: note._id,
      user: userId,
      title,
      text,
      completed,
    }
    updateNote(updatedNote)
    console.log("updatedNote", updatedNote)
    console.log("oldUser", initial)
    navigate(`/dash/notes`)
  }
  const { mutate: deleteNote } = useDeleteNote()
  const handleDeleteNote = (e) => {
    e.preventDefault()
    const noteId = note._id
    deleteNote(noteId)
    // console.log(noteId)
    navigate(`/dash/notes`)
  }
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <div className={styles.titlerow}>
          <h1 className={styles.h2}>Edit Note #{note.ticket}</h1>
          <div className={styles.actionbuttons}>
            <button onClick={handleUpdateNote}>SAVE</button>
            <button onClick={handleDeleteNote} className={styles.iconbutton}>
              DELETE
            </button>
          </div>
        </div>
        <label className={styles.label} htmlFor="note-title">
          Title:
        </label>
        <input
          id="note-title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          onChange={(e) => setText(e.target.value)}
        />
        <div className={styles.row}>
          <div className={styles.divider}>
            <label
              className={styles.checkboxcontainer}
              htmlFor="note-completed"
            >
              WORK COMPLETE:
            </label>
            <input
              className={styles.checkbox}
              id="note-completed"
              type="checkbox"
              name="completed"
              checked={completed}
              onChange={onCompletedChanged}
            />
            {(isAdmin || isManager) && (
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
              <p>
                Created:
                <br />
                {note.createdAt}
              </p>
              <p>
                Updated:
                <br />
                {note.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
    //submit=>Call UpdateNote
  )
}

export default EditNoteForm
