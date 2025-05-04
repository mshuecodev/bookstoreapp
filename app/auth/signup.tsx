import React, { useState } from "react"
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { useAuth } from "@/features/auth/useAuth"
import { useNavigation } from "@react-navigation/native"
import globalStyles from "@/styles/styles"

export default function SignupScreen() {
	const { handleRegister, loading, error } = useAuth()
	const navigation = useNavigation()

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	})

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const handleInputChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value })
	}

	const handleSignup = async () => {
		const { email, password, confirmPassword } = formData

		// Validate all fields are filled
		if (!email || !password || !confirmPassword) {
			Alert.alert("Error", "All fields are required")
			return
		}

		// Validate email format
		if (!validateEmail(email)) {
			Alert.alert("Error", "Please enter a valid email address")
			return
		}

		// Validate password and confirm password match
		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match")
			return
		}

		try {
			await handleRegister({ email, password })
			Alert.alert("Success", "User registered successfully")
			navigation.navigate("signin" as never) // Navigate to Signin after registration
		} catch (err) {
			Alert.alert("Error", error || "Something went wrong")
		}
	}

	const handleGoogleSignup = () => {
		Alert.alert("Google Signup", "Google signup functionality not implemented yet.")
	}

	return (
		<View style={globalStyles.container}>
			<Text style={globalStyles.title}>Create an Account</Text>
			{error && <Text style={globalStyles.error}>{error}</Text>}
			<TextInput
				label="Email"
				value={formData.email}
				onChangeText={(value) => handleInputChange("email", value)}
				style={globalStyles.input}
				mode="outlined"
				keyboardType="email-address"
				theme={{ colors: { primary: "#1E90FF" } }}
			/>
			<TextInput
				label="Password"
				value={formData.password}
				onChangeText={(value) => handleInputChange("password", value)}
				style={globalStyles.input}
				mode="outlined"
				secureTextEntry
				theme={{ colors: { primary: "#1E90FF" } }}
			/>
			<TextInput
				label="Confirm Password"
				value={formData.confirmPassword}
				onChangeText={(value) => handleInputChange("confirmPassword", value)}
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
					onPress={handleSignup}
					style={[globalStyles.button, globalStyles.primaryButton]}
					labelStyle={globalStyles.primaryButtonText}
				>
					Sign Up
				</Button>
			)}
			<Text style={globalStyles.orText}>- Or sign up with -</Text>
			<View style={globalStyles.socialButtonsContainer}>
				<Button
					mode="contained"
					onPress={handleGoogleSignup}
					style={[globalStyles.socialButton, { backgroundColor: "#DB4437" }]}
					labelStyle={globalStyles.socialButtonText}
				>
					Google
				</Button>
			</View>
			<TouchableOpacity onPress={() => navigation.navigate("signin" as never)}>
				<Text style={globalStyles.linkText}>
					Already have an account? <Text style={globalStyles.linkHighlight}>Sign in</Text>
				</Text>
			</TouchableOpacity>
		</View>
	)
}
