import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "@/app/home"
import DetailScreen from "@/app/home/detail"
import HomeTab from "./protected"

const Stack = createNativeStackNavigator()

function HomeStack() {
	return (
		<Stack.Navigator
			initialRouteName="home"
			// screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name="Home"
				options={{ headerShown: false }}
				component={HomeTab}
			/>
			<Stack.Screen
				name="DetailBook"
				component={DetailScreen}
			/>
		</Stack.Navigator>
	)
}

export default HomeStack
