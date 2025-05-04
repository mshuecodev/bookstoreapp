export interface AuthState {
	token: string | null
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}

export interface RegisterPayload {
	email: string
	password: string
}
