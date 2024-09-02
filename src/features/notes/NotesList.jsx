import { useNavigate } from "react-router-dom"
import { useNotesData } from "../../hooks/useNotesData"
import NoteItem from "./NoteItem"
import styles from "./NotesList.module.css"
import useAuthorization from "../../hooks/useAuthorization"

// import { useMutation, useQuery } from "@tanstack/react-query"

function NotesList() {
  const { username, isAdmin, isManager } = useAuthorization()
  // const [noNotes, setNoNotes] = useState("false")
  const navigate = useNavigate()
  const onSuccess = (data) => {
    console.log("success", data)
  }
  const onError = () => {
    console.log("error")
  }
  const { isInitialLoading, isFetching, isError, data, error } = useNotesData(
    onSuccess,
    onError
  )
  if (isInitialLoading || isFetching) {
    return <h1 className={styles.message}>Loading...</h1>
  }
  if (isError) {
    if (error.response.status === 401) {
      return <h1 className={styles.errmessage}>UNAUTHORIZED</h1>
    } else {
      return <h1 className={styles.errmessage}>{error}</h1>
    }
  }
  const totalLength = data.data.length
  const userNotesLength = data.data.filter(
    (note) => note.username === username
  ).length
  return (
    <>
      {totalLength === 0 ||
      (!isAdmin && !isManager && userNotesLength === 0) ? (
        <div>
          <button
            className={styles.addbutton}
            onClick={() => navigate(`/dash/notes/new`)}
          >
            ADD NOTES TO DISPLAY
          </button>
        </div>
      ) : (
        <>
          <div className={styles.titlerow}>
            <h1 className={styles.h2}>NOTES LIST</h1>
            <button
              className={styles.titlerowbutton}
              onClick={() => navigate(`/dash/notes/new`)}
            >
              ADD NEW
            </button>
          </div>
          <div className={styles.notes}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map(
                  (note) =>
                    (isManager || isAdmin || note.username === username) && (
                      <NoteItem note={note} key={note.title} />
                    )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
// function wait(duration) {
//   return new Promise((resolve) => setTimeout(resolve, duration))
// }
export default NotesList
