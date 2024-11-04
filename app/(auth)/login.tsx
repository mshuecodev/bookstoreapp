import { useAuth } from "@/context/AuthContext"
import { Button, Text, View } from "react-native"

export default function LoginScreen() {
	const { login } = useAuth()

	const handleLogin = () => {
		console.log("press here")
		login({ name: "User" })
	}

	return (
		<View>
			<Text>Login Screen</Text>
			<Button
				title="Login"
				onPress={handleLogin}
			/>
		</View>
	)
}
