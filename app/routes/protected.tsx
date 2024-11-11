import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStack from "./homestack"
import SettingScreen from "@/app/setting"
import HomeScreen from "@/app/home"

const Tab = createBottomTabNavigator()

function ProtectedNav() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingScreen}
			/>
		</Tab.Navigator>
	)
}

export default ProtectedNav
