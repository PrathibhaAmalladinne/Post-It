import axios from "axios"
// import axiosRetry from "axios-retry"
import { useAuth } from "../context/AuthContext" // Assuming useAuth is defined in authContext

const useApi = () => {
  const { currentToken, token, setCredentials } = useAuth()
  // const[currentToken,setCurrenToken] = useState[token]
  const instance = axios.create({
    baseURL: "https://post-it-api-a1t6.onrender.com/",
    withCredentials: true,
    // timeout: 3000,
  })
  // axiosRetry(instance, { retries: 3 })
  instance.interceptors.request.use((config) => {
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`
      console.log("Request Config:", config)
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => {
      console.log("Response Received", response)
      if (response.config.headers.Authorization === "Bearer null") {
        setCredentials({ accessToken: response.data?.accessToken })
      }
      return response
    },
    async (error) => {
      const requestConfig = error.config
      const status = error.response ? error.response.status : null

      if (status === 403 && !requestConfig._retry) {
        requestConfig._retry = "true" // Flag to prevent infinite loop
        try {
          console.log("Sending refresh token")
          const refreshResult = await instance.get(`/auth/refresh`)
          if (refreshResult?.data) {
            const newToken = refreshResult.data.accessToken
            setCredentials({ accessToken: newToken })
            requestConfig.headers.Authorization = `Bearer ${newToken}`
            return axios(requestConfig)
          } else {
            if (refreshResult?.error?.status === 403) {
              refreshResult.error.data.message = "Your login has expired"
              // return refreshResult
            }
          }
        } catch (refreshError) {
          if (refreshError.response?.status === 403) {
            refreshError.response.data.message = "Your login has expired."
          }
          return Promise.reject(refreshError)
        }
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export default useApi
