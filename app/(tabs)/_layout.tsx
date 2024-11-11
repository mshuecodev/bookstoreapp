import { Tabs } from "expo-router"
import React, { useState, useEffect } from "react"
import { Text } from "react-native"

import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import SplashScreen from "@/components/splash/SplashScreen"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarShowLabel: false
			}}
		>
			<Tabs.Screen
				name="home/index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name="home"
							color={color}
						/>
					)
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name="book-open"
							color={color}
						/>
					)
				}}
			/>
			<Tabs.Screen
				name="author"
				options={{
					title: "Author",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name="users"
							color={color}
						/>
					)
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name="search"
							color={color}
						/>
					)
				}}
			/>
			<Tabs.Screen
				name="inbox"
				options={{
					title: "Inbox",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name="inbox"
							color={color}
						/>
					)
				}}
			/>
		</Tabs>
	)
}
