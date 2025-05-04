export interface AuthState {
	token: string | null
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}

export interface RegisterPayload {
	username: string
	email: string
	password: string
}
