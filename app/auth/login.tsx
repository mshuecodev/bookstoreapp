import React, { useState } from "react"
import { Button, Text, View } from "react-native"
import { TextInput } from "react-native-paper"
import styles from "./styles"

import { useAuth } from "@/features/auth/useAuth"

export default function LoginScreen() {
	const { handleLogin, loading, error } = useAuth()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	return (
		<View style={styles.container}>
			{error && <Text>{error}</Text>}
			<TextInput
				label="Email"
				value={username}
				onChangeText={(text) => setUsername(text)}
			/>
			<TextInput
				label="Password"
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			<Button
				title="Login"
				onPress={() => handleLogin(username, password)}
				disabled={loading}
			/>
		</View>
	)
}
