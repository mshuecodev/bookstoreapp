import axios from "axios"

const apiClient = axios.create({
	baseURL: "https://api.example.com",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json"
	}
})

// Handle request and response errors globally
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Here you can handle global errors (e.g., refresh token logic)
		return Promise.reject(error)
	}
)

export default apiClient
