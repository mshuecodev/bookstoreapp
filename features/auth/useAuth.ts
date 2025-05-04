import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { login, logout, register } from "./authSlice"
import { RegisterPayload } from "./authTypes"

export const useAuth = () => {
	const dispatch = useAppDispatch()
	const authState = useAppSelector((state) => state.auth)

	const handleLogin = (username: string, password: string) => {
		dispatch(login({ username, password }))
	}

	const handleLogout = () => {
		dispatch(logout())
	}

	const handleRegister = (payload: RegisterPayload) => {
		dispatch(register(payload))
	}

	return {
		...authState,
		handleLogin,
		handleLogout,
		handleRegister
	}
}
