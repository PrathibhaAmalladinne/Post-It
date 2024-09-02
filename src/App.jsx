import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
// import ForLoggingOut from "./components/ForLoggingout"
import About from "./pages/About"
import DashLayout from "./pages/DashLayout"
import NotesList from "./features/notes/NotesList"
import UsersList from "./features/users/UsersList"
import EditNote from "./features/notes/EditNote"
import NewNote from "./features/notes/NewNote"
import EditUser from "./features/users/EditUser"
import NewUser from "./features/users/NewUser"
import { AuthContextProvider } from "./context/AuthContext"
import RequireAuth from "./features/RequireAuth"
function App() {
  const ROLES = {
    Employee: "Employee",
    Manager: "Manager",
    Admin: "Admin",
  }
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/*public routes */}
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          {/*protected routes */}
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route path="dash" element={<DashLayout />}>
              <Route path="notes">
                <Route index element={<NotesList />} />
                <Route path="new" element={<NewNote />} />
                <Route path=":noteId" element={<EditNote />} />
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />
                }
              >
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path="new" element={<NewUser />} />
                  <Route path=":userId" element={<EditUser />} />
                </Route>
              </Route>
            </Route>
          </Route>
          {/*End of protected routes */}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
