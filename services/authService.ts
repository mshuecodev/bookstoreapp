import apiClient from "./apiClient"
import { LoginResponse, RefreshTokenResponse } from "./responseTypes"
import { RegisterPayload } from "@/features/auth/authTypes"

export const loginUser = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
	// Sending a POST request to the /auth/login endpoint with user credentials

	const response = await apiClient.post<LoginResponse>("/auth/login", credentials)
	console.log("auth services", response.data)

	return response.data // Returns the access token and refresh token
}

export const refreshToken = async (refreshToken: string | null): Promise<RefreshTokenResponse> => {
	if (!refreshToken) throw new Error("No refresh token provided")

	// Sending a POST request to the /auth/refresh endpoint with the refresh token
	const response = await apiClient.post<RefreshTokenResponse>("/users/auth/refresh-token", { refreshToken })
	return response.data // Returns a new access token
}

export const registerUser = async (userData: RegisterPayload): Promise<{ accessToken: any; refreshToken: any; user: any }> => {
	// Sending a POST request to the /auth/register endpoint with user data
	const response = await apiClient.post("/auth/register", userData)
	console.log("User registered successfully", response.data)
	const { accessToken, refreshToken, user } = await response.data
	return {
		accessToken,
		refreshToken,
		user
	}
}
