export interface UserProfile {
	id: number
	name: string
}

export interface UserState {
	isAuthenticated: boolean
	profile: UserProfile | null
	isLoading: boolean
	error: string | null
}
