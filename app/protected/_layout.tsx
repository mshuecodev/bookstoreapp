// filepath: app/protected/_layout.tsx
import { Stack, useRouter } from "expo-router"
import { useAuth } from "@/features/auth/useAuth"
import { useEffect } from "react"

export default function ProtectedLayout() {
	const { isAuthenticated } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace("/") // Redirect to login if not authenticated
		}
	}, [isAuthenticated])

	return <Stack screenOptions={{ headerShown: false }} />
}
