import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"
import { useUserData } from "../../hooks/useUsersData"

function EditUser() {
  const { userId } = useParams()

  const onSuccess = (data) => {
    console.log("usersuccess")
  }
  const onError = () => {
    console.log("error")
  }
  const { isLoading, isFetching, isError, error, data } = useUserData(
    userId,
    onSuccess,
    onError
  )
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  const [user] = data
  return <EditUserForm user={user} />
}

export default EditUser
