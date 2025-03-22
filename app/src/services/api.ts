import axios from 'axios'

const API_BASE_URL = 'http://184.73.145.4:8085'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export type ApiErrorType = {
  status: number
  message: string
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const apiError: ApiErrorType = {
        status: error.response.status,
        message: error.response.data?.error || 'Unknown error occurred',
      }

      return Promise.reject(apiError)
    }
    return Promise.reject(error)
  }
)

export default api
