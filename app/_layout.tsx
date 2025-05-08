import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import "@/global.css"
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import React, { useEffect } from "react"
import "react-native-reanimated"
import { PaperProvider } from "react-native-paper"
import { Provider } from "react-redux"
import { Stack, Slot } from "expo-router"
import store from "@/store"
import { useColorScheme } from "@/hooks/useColorScheme"
import { ThemeContext } from "@/context/Theme"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

let defaultTheme: "dark" | "light" = "light"

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
	})

	const [colorMode, setColorMode] = React.useState<"dark" | "light">(defaultTheme)

	const toggleColorMode = async () => {
		setColorMode((prev) => (prev === "light" ? "dark" : "light"))
	}

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
			<GluestackUIProvider mode="light">
				<Provider store={store}>
					<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
						<PaperProvider>
							{/* <Stack screenOptions={{ headerShown: false }} /> */}
							<Slot />
						</PaperProvider>
					</ThemeProvider>
				</Provider>
			</GluestackUIProvider>
		</ThemeContext.Provider>
	)
}
