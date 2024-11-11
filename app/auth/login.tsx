import { useAuth } from "@/context/AuthContext"
import { Button, Text, View } from "react-native"
import { TextInput } from "react-native-paper"
import styles from "./styles"

export default function LoginScreen() {
	const { login } = useAuth()

	const handleLogin = () => {
		console.log("press here")
		login({ name: "User" })
	}

	return (
		<View style={styles.container}>
			<TextInput
				label="Username"
				//   value={text}
				//   onChangeText={text => setText(text)}
			/>
			<TextInput
				label="Password"
				//   value={text}
				//   onChangeText={text => setText(text)}
			/>
			<Button
				title="Login"
				onPress={handleLogin}
			/>
		</View>
	)
}
