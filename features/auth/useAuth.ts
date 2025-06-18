import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { login, logoutAsync, register } from "./authSlice"
import { RegisterPayload } from "./authTypes"

export const useAuth = () => {
	const dispatch = useAppDispatch()
	const { isAuthenticated, user, error, loading } = useAppSelector((state) => state.auth)

	// Handle login
	const handleLogin = async (email: string, password: string): Promise<boolean> => {
		try {
			await dispatch(login({ email, password })).unwrap()
			return true
		} catch (err) {
			console.error("Login failed:", err)
			return false
		}
	}

	// Handle logout
	const handleLogout = () => {
		dispatch(logoutAsync())
	}

	// Handle registration
	const handleRegister = async (payload: RegisterPayload): Promise<boolean> => {
		try {
			await dispatch(register(payload)).unwrap()
			return true
		} catch (err) {
			console.error("Registration failed:", err)
			return false
		}
	}

	return {
		isAuthenticated,
		user,
		error,
		loading,
		handleLogin,
		handleLogout,
		handleRegister
	}
}
