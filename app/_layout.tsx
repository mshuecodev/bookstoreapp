import { AuthProvider } from "@/context/AuthContext"
import { Slot } from "expo-router"
import AuthHandler from "./AuthHandler"
import { PaperProvider } from "react-native-paper"

export default function Layout() {
	return (
		<AuthProvider>
			<PaperProvider>
				<AuthHandler />
				<Slot />
			</PaperProvider>
		</AuthProvider>
	)
}
