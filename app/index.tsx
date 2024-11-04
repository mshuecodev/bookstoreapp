import { useAuth } from "@/context/AuthContext"
import { useRouter } from "expo-router"
import { useEffect } from "react"

export default function Index() {
	const { user } = useAuth()
	const router = useRouter()

	useEffect(() => {
		console.log("index here to replace route", user)
		if (user) {
			router.replace("/(tabs)")
		} else {
			router.replace("/(auth)/login")
		}
	}, [user, router])

	return null
}
