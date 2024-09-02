import { useUsersData } from "../../hooks/useUsersData"
import NewNoteForm from "./NewNoteForm"

function NewNote() {
  const onSuccess = (data) => {
    console.log("success", data)
  }
  const onError = (error) => {
    console.log("error", error)
  }
  const { isLoading, isFetching, isError, error, data } = useUsersData(
    onSuccess,
    onError
  )
  if (isLoading || isFetching) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    console.log(error)
  }

  return <NewNoteForm users={data} />
}

export default NewNote
