import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { useAuth } from "@/features/auth/useAuth"

import ProtectedNav from "./homestack"
import PublicNav from "./public"

function Index() {
	const { handleLogout, isAuthenticated } = useAuth()

	return <NavigationContainer independent={true}>{isAuthenticated ? <ProtectedNav /> : <PublicNav />}</NavigationContainer>
}

export default Index
