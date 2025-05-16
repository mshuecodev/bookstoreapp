import axios from "axios"
import store from "@/store"
import { getToken } from "./secureStoreService"
// import { refreshAuthToken } from "@/features/auth/authSlice"

const apiClient = axios.create({
	baseURL: "http://192.168.72.130:5000",
	// timeout: 10000,
	headers: {
		"Content-Type": "application/json"
	}
})

// apiClient.interceptors.request.use(
// 	async (config) => {
// 		try {
// 			console.log("Request Interceptor: Starting")

// 			const token = await getToken()
// 			if (token) {
// 				config.headers.Authorization = `Bearer ${token}`
// 				console.log("interceptor token here", token)
// 			} else {
// 				console.log("no token found")
// 			}
// 			return config
// 		} catch (error) {
// 			console.log("Request interceptor error", error)
// 			return Promise.reject(error)
// 		}
// 	},
// 	(error) => {
// 		console.log("request interceptor error (onRequestError)", error)
// 		return Promise.reject(error)
// 	}
// )

// apiClient.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		console.log("interceptor response here!")
// 		const originalRequest = error.config

// 		if (error.response.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true
// 			await store.dispatch(refreshAuthToken())
// 			const token = await getToken()

// 			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
// 			return apiClient(originalRequest)
// 		}

// 		return Promise.reject(error)
// 	}
// )

export default apiClient
