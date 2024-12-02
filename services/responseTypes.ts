export interface ApiResponse<T> {
	data: T
	message: string
	status: number
}

export interface LoginResponse {
	accessToken: string
	refreshToken: string
}

export interface RefreshTokenResponse {
	token: string
}
