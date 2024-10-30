import { Tabs } from "expo-router"
import React, { useState, useEffect } from "react"
import { Text } from "react-native"

import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import SplashScreen from "@/components/splash/SplashScreen"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"

export default function TabLayout() {
	const colorScheme = useColorScheme()
	const [isSignedIn, setSignedIn] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [loadingMessage, setLoadingMessage] = useState<string>("Loading")

	useEffect(() => {
		// Set an interval to update the loading message
		const interval = setInterval(() => {
			setLoadingMessage((prevMessage) => {
				if (prevMessage.endsWith("...")) {
					return "Loading"
				} else {
					return prevMessage + "."
				}
			})
		}, 500)

		// Simulate a longer loading time to test the loading screen
		const loadingTimeout = setTimeout(() => {
			setIsLoading(false) // Set isLoading to false after loading is complete
			clearInterval(interval) // Clear the interval after loading completes
		}, 5000) // Increase this to give time for loading animation

		// Cleanup function to clear the interval and timeout
		return () => {
			clearInterval(interval)
			clearTimeout(loadingTimeout)
		}
	}, [])

	if (isLoading) {
		// We haven't finished checking for the token yet
		return (
			<SplashScreen
				loading={isLoading}
				loadingMessage={loadingMessage}
			/>
		)
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarShowLabel: false
			}}
		>
			<Tabs.Screen
				name="index"
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
