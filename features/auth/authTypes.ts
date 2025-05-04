export interface AuthState {
	token: string | null
	isAuthenticated: boolean
	user: User | null
	loading: boolean
	error: string | null
}

export interface RegisterPayload {
	email: string
	password: string
}

export interface User {
	id: string
	name: string
	email: string
}
