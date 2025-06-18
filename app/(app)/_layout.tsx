// filepath: app/protected/_layout.tsx
import { Stack, useRouter, Redirect } from "expo-router"
import { Text } from "react-native"
import { useAuth } from "@/features/auth/useAuth"

export default function ProtectedLayout() {
	const { isAuthenticated, loading } = useAuth()

	if (loading) {
		return <Text>Loading...</Text>
	}

	if (!isAuthenticated) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/signin" />
	}

	return <Stack screenOptions={{ headerShown: false }} />
}
