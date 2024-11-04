import { useAuth } from "@/context/AuthContext"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

export default function AuthHandler() {
	const { user } = useAuth()
	const router = useRouter()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true) // Set mounted to true once the component has rendered
	}, [])

	useEffect(() => {
		if (mounted) {
			// Ensure navigation only after mounted
			if (!user) {
				router.replace("/(auth)/login") // Redirect to login if unauthenticated
			} else {
				router.replace("/(tabs)") // Redirect to main tabs if authenticated
			}
		}
	}, [user, router, mounted]) // Depend on mounted to avoid early navigation

	return null // No UI for this component, it only handles navigation
}
