import { createSlice } from "@reduxjs/toolkit"
import { createEntityAdapter } from "@reduxjs/toolkit"

// const notesAdapter = createEntityAdapter({
//   sortComparer: (a, b) =>
//     a.completed === b.completed ? 0 : a.completed ? 1 : -1,
// })

const initialState = { notes: {} }

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes[action.payload._id] = action.payload
    },
    updateNote: (state, action) => {
      state.notes[action.payload._id] = action.payload
    },
    deleteNote: (state, action) => {
      delete state.notes[action.payload._id]
    },
    // selectNoteById: (state, action) => state.notes[action.payload],
  },
})
export const { addNote, updateNote, deleteNote } = notesSlice.actions

export const selectNoteById = notesAdapter.getSelectors((state) => state.notes)

export default notesSlice.reducer
