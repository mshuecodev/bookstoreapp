import { useAuth } from "@/context/AuthContext"
import { useRouter, Href } from "expo-router"
import { useEffect } from "react"
import { ROUTES } from "@/constants/routes"

export const useAuthRedirect = () => {
	const { user } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.replace(ROUTES.LOGIN as Href<string>)
		}
	}, [user, router])
}
