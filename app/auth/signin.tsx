import React, { useState } from "react"
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@/features/auth/useAuth"
import globalStyles from "@/app/styles/styles"

export default function LoginScreen() {
	const { handleLogin, loading, error } = useAuth()
	const navigation = useNavigation()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const navigateToSignup = () => {
		navigation.navigate("signup" as never) // Navigate to the Signup screen
	}

	return (
		<View style={globalStyles.container}>
			<Text style={globalStyles.title}>Login to your Account</Text>
			{error && <Text style={globalStyles.error}>{error}</Text>}
			<TextInput
				label="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
				style={globalStyles.input}
				mode="outlined"
				theme={{ colors: { primary: "#1E90FF" } }}
			/>
			<TextInput
				label="Password"
				value={password}
				onChangeText={(text) => setPassword(text)}
				style={globalStyles.input}
				mode="outlined"
				secureTextEntry
				theme={{ colors: { primary: "#1E90FF" } }}
			/>
			{loading ? (
				<ActivityIndicator
					size="large"
					color="#1E90FF"
				/>
			) : (
				<Button
					mode="contained"
					onPress={() => handleLogin(email, password)}
					style={[globalStyles.button, globalStyles.primaryButton]}
					labelStyle={globalStyles.primaryButtonText}
				>
					Sign In
				</Button>
			)}
			<Text style={globalStyles.orText}>- Or sign in with -</Text>
			<View style={globalStyles.socialButtonsContainer}>
				<Button
					mode="contained"
					onPress={() => {}}
					style={[globalStyles.socialButton, { backgroundColor: "#DB4437" }]}
					labelStyle={globalStyles.socialButtonText}
				>
					Google
				</Button>
			</View>
			<TouchableOpacity onPress={navigateToSignup}>
				<Text style={globalStyles.linkText}>
					Don't have an account? <Text style={globalStyles.linkHighlight}>Sign up</Text>
				</Text>
			</TouchableOpacity>
		</View>
	)
}
