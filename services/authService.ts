import apiClient from "./apiClient"
import { LoginResponse, RefreshTokenResponse } from "./responseTypes"

export const loginUser = async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
	// Sending a POST request to the /auth/login endpoint with user credentials

	const response = await apiClient.post<LoginResponse>("/users/auth/login", credentials)
	console.log("auth services", response.data)

	return response.data // Returns the access token and refresh token
}

export const refreshToken = async (refreshToken: string | null): Promise<RefreshTokenResponse> => {
	if (!refreshToken) throw new Error("No refresh token provided")

	// Sending a POST request to the /auth/refresh endpoint with the refresh token
	const response = await apiClient.post<RefreshTokenResponse>("/users/auth/refresh-token", { refreshToken })
	return response.data // Returns a new access token
}
