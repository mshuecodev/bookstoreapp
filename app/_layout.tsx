import { AuthProvider } from "@/context/AuthContext"
import { Slot } from "expo-router"
import AuthHandler from "./AuthHandler"

export default function Layout() {
	return (
		<AuthProvider>
			<AuthHandler />
			<Slot />
		</AuthProvider>
	)
}
