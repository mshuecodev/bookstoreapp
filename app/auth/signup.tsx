import { Text, View, Button } from "react-native"
import { TextInput } from "react-native-paper"

export default function SignupScreen() {
	return (
		<View>
			<TextInput
				label="Name"
				//   value={text}
				//   onChangeText={text => setText(text)}
			/>
			<TextInput
				label="Email"
				//   value={text}
				//   onChangeText={text => setText(text)}
			/>
			<TextInput
				label="Password"
				//   value={text}
				//   onChangeText={text => setText(text)}
			/>
			<Button
				title="Sing Up"
				// onPress={handleLogin}
			/>
		</View>
	)
}
