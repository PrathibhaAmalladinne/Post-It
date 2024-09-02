import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import useApi from "./useApi"

export const useLogin = () => {
  const { setCredentials } = useAuth()
  const instance = useApi()
  return useMutation(
    async (credentials) => {
      const response = await instance.post(`/auth/login`, credentials)
      return response.data
    },
    {
      onError: (error) => {
        console.log(error.response.data)
        console.log(error.response.status)
      },
      onSuccess: (data) => {
        // console.log("uselogin success", data)
        const accessToken = data?.accessToken
        setCredentials(accessToken)
      },
    }
  )
}

export const useSendLogout = () => {
  const queryClient = useQueryClient()
  const { setCredentials } = useAuth()
  const instance = useApi()
  return useMutation(
    async (nothing) => {
      const response = await instance.post(`/auth/logout`, nothing)
      return response
    },
    {
      onError: (error) => {
        console.log(error.response.data)
        console.log(error.response.status)
      },
      onSuccess: () => {
        // console.log("settingcreds")
        setCredentials(null)
        setTimeout(() => {
          queryClient.resetQueries()
        }, 1000)
      },
    }
  )
}

// export const useRefresh = () => {
//   const instance = useApi()
//   const { setCredentials } = useAuth()
//   return useMutation(
//     async () => {
//       const response = await instance.get(`/auth/refresh`)
//       return response
//     },
//     {
//       onSuccess: (data) => {
//         setCredentials({ accessToken: data.accessToken })
//         return response.data.accessToken
//       },
//       onerror: (error) => {
//         console.log(error.response.data)
//         console.log(error.response.status)
//       },
//     }
//   )
// }
