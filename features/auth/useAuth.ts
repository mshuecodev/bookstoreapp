import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { login, logout } from "./authSlice"

export const useAuth = () => {
	const dispatch = useAppDispatch()
	const authState = useAppSelector((state) => state.auth)

	const handleLogin = (username: string, password: string) => {
		dispatch(login({ username, password }))
	}

	const handleLogout = () => {
		dispatch(logout())
	}

	return {
		...authState,
		handleLogin,
		handleLogout
	}
}
