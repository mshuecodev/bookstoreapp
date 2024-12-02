export interface AuthState {
	token: string | null
	// refreshToken: string | null
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}
