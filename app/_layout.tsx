import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import React, { useEffect } from "react"
import "react-native-reanimated"
import { PaperProvider } from "react-native-paper"
import { Provider } from "react-redux"
import { Stack } from "expo-router"
import store from "@/store"

import { useColorScheme } from "@/hooks/useColorScheme"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<Provider store={store}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<PaperProvider>
					<Stack />
				</PaperProvider>
			</ThemeProvider>
		</Provider>
	)
}
