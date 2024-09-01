import { DarkTheme, DefaultTheme } from "@react-navigation/native"
import { ThemeProvider, createTheme } from "@rneui/themed"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/useColorScheme"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const theme = createTheme({
	lightColors: {
		primary: "#e7e7e8"
	},
	darkColors: {
		primary: "#000"
	},
	mode: "light"
})

export default function RootLayout() {
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
		<ThemeProvider
			theme={theme}
			// value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="+not-found" />
			</Stack>
		</ThemeProvider>
	)
}
