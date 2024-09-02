import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useApi from "./useApi"

//GET
export const useUsersData = () => {
  const instance = useApi()
  return useQuery(
    ["users-all"],
    async () => {
      const response = await instance.get(`/users`)
      return response.data
    },
    {}
  )
}
//POST
export const useAddNewUser = () => {
  const instance = useApi()
  const queryClient = useQueryClient()
  return useMutation(
    async (newUser) => {
      const response = await instance.post(`/users`, newUser)
      return response.data
    },
    {
      onError: (error) => {
        console.log(error.response.data)
        console.log(error.response.status)
      },
      onSuccess: () => {
        queryClient.invalidateQueries("users-all")
      },
    }
  )
}
//PATCH
export const useUpdateUser = () => {
  const instance = useApi()
  const queryClient = useQueryClient()
  return useMutation(
    async (updatedUser) => {
      const response = await instance.patch(`/users`, updatedUser)
      console.log(response)
      return toString(response.data)
    },
    {
      onError: (error) => {
        console.log(error.response.data)
        console.log(error.response.status)
      },
      onSuccess: () => {
        queryClient.invalidateQueries("users-all")
      },
    }
  )
}
//DELETE
export const useDeleteUser = () => {
  const instance = useApi()
  const queryClient = useQueryClient()
  return useMutation(
    async (userId) => {
      const response = await instance.delete(`/users/${userId}`, {
        data: { id: userId },
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
        queryClient.invalidateQueries("users-all")
      },
    }
  )
}

export const useUserData = (userId, onSuccess, onError) => {
  const instance = useApi()
  return useQuery(
    ["users-all"],
    async () => {
      const response = await instance.get(`/users`)
      return response.data
    },
    {
      onSuccess,
      onError,
      select: (data) => {
        const user = data?.filter((user) => user._id === userId)
        return user
      },
    }
  )
}
