import axiosInstance from '@axios'

export default function useInterceptors(requestInterceptor, responseInterceptors) {
  axiosInstance.interceptors.request.use(...requestInterceptors)
  axiosInstance.interceptors.response.use(...responseInterceptors)
  return axiosInstance
}
