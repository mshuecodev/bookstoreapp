import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "@/app/auth/login"
import SignupScreen from "@/app/auth/signup"

const Stack = createNativeStackNavigator()

function PublicNav() {
	return (
		<Stack.Navigator
			initialRouteName="signin"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name="signin"
				component={LoginScreen}
			/>
			<Stack.Screen
				name="signup"
				component={SignupScreen}
			/>
		</Stack.Navigator>
	)
}

export default PublicNav
