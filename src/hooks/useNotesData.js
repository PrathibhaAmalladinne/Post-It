import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import useApi from "./useApi"

//GET
export const useNotesData = () => {
  const instance = useApi()
  return useQuery(["notes-all"], async () => {
    const response = await instance.get(`/notes`)
    console.log(response)
    return response
  })
}
//POST
export const useAddNewNote = () => {
  const instance = useApi()
  const queryClient = useQueryClient()
  return useMutation(
    async (newNote) => {
      const response = await instance.post(`/notes`, newNote)
      return response.data
    },
    {
      onError: (error) => {
        console.log(error.response.data)
        console.log(error.response.status)
      },
      onSuccess: () => {
        queryClient.invalidateQueries("notes-all")
      },
    }
  )
}
//PATCH
export const useUpdateNote = () => {
  const instance = useApi()
  const queryClient = useQueryClient()
  return useMutation(
    async (updatedNote) => {
      const response = await instance.patch(`/notes`, updatedNote)
      return response.data
    },
    {
      onError: (error) => {
        console.log(error.response.data)
        console.log(error.response.status)
      },
      onSuccess: () => {
        queryClient.invalidateQueries("notes-all")
      },
    }
  )
}
//DELETE
export const useDeleteNote = () => {
  const instance = useApi()
  const queryClient = useQueryClient()
  return useMutation(
    async (noteId) => {
      const response = await instance.delete(`/notes/${noteId}`, {
        data: { id: noteId },
      })
      // console.log(response, toString(response.data))
      return response
      // return toString(response.data)
    },
    {
      onError: (error) => {
        console.log(error.response.data)
        console.log(error.response.status)
      },
      onSuccess: () => {
        queryClient.invalidateQueries("notes-all")
      },
    }
  )
}

export const useNoteData = (noteId) => {
  const instance = useApi()
  return useQuery(
    ["notes-all"],
    async () => {
      const response = await instance.get(`/notes`)
      return response.data
    },
    {
      select: (data) => {
        const note = data?.filter((note) => note._id === noteId)
        return note
      },
    }
  )
}

export const useNotesByUserId = (userId, onSuccess, onError) => {
  const instance = useApi()
  return useQuery(
    ["notes-all"],
    async () => {
      const response = await instance.get(`/notes`)
      return response.data
    },
    {
      onSuccess,
      onError,
      select: (data) => {
        const notes = data?.filter((note) => note.user === userId)
        return notes
      },
    }
  )
}

// export const useAddNewNote = () => {
//   const queryClient = useQueryClient()
//   return useMutation(addNewNote, {
//     onError: (error) => {
//       console.log(error.response.data)
//       console.log(error.response.status)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries("notes-all")
//     },
//   })
// }
