import UserItem from "./UserItem"
import styles from "./UsersList.module.css"
import { useUsersData } from "../../hooks/useUsersData"
import { useNavigate } from "react-router-dom"

function UsersList() {
  const navigate = useNavigate()

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
    return <h1 className={styles.message}>Loading...</h1>
  }
  if (isError) {
    if (error.response.status === 401) {
      return <h1 className={styles.errmessage}>UNAUTHORIZED</h1>
    } else {
      return <h1 className={styles.errmessage}>{error}</h1>
    }
  }

  const handleAddNew = (e) => {
    e.preventDefault()
    navigate(`/dash/users/new`)
  }
  return (
    <main className={styles.users}>
      <div className={styles.titlerow}>
        <h1 className={styles.h2}>USERS LIST</h1>
        <button className={styles.titlerowbutton} onClick={handleAddNew}>
          ADD NEW
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Role(s)</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <UserItem user={user} key={user._id} />
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default UsersList
