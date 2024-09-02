import { useParams } from "react-router-dom"
import { useNoteData } from "../../hooks/useNotesData"
import EditNoteForm from "./EditNoteForm"
import { useUsersData } from "../../hooks/useUsersData"
// import { useEffect, useState } from "react"

function EditNote() {
  const { noteId } = useParams()
  const onSuccess = (data) => {
    console.log("NoteSuccess", data)
  }
  const onError = () => {
    console.log("error")
  }

  const onSuccessUsers = (data) => {
    console.log("success", data)
  }
  const onErrorUsers = (error) => {
    console.log("error", error)
  }

  const calls = () => {
    const userQuery = useUsersData(onSuccessUsers, onErrorUsers)
    const noteQuery = useNoteData(noteId, onSuccess, onError)
    return [noteQuery, userQuery]
  }
  const [
    { isLoading, isFetching, isError, error, data },
    {
      isLoadingUsers,
      isFetchingUsers,
      isErrorUsers,
      errorUsers,
      data: dataUsers,
    },
  ] = calls()

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>error.message</h2>
  }

  if (isLoadingUsers || isFetchingUsers) {
    return <h1>Loading...</h1>
  }
  if (isErrorUsers) {
    console.log(errorUsers)
  }
  // console.log(data, dataUsers, "data")
  return (
    <EditNoteForm
      key={data?.length + dataUsers?.length}
      note={data?.[0]}
      users={dataUsers}
    />
  )
}

export default EditNote
