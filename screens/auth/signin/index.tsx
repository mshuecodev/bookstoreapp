import React, { useState } from "react"
import { Keyboard, View } from "react-native"
import { Box, Text, VStack, HStack, Spinner, Pressable, Heading } from "@/components/ui"
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { ArrowLeftIcon, CheckIcon, EyeIcon, EyeOffIcon, Icon } from "@/components/ui/icon"
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox"
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button"
import { LinkText, Link } from "@/components/ui/link"
import { Toast, ToastTitle, useToast } from "@/components/ui/toast"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "@/features/auth/useAuth"
import { useRouter } from "expo-router"
import { AlertTriangle } from "lucide-react-native"
import { GoogleIcon } from "@/assets/icons/google"
import { AuthLayout } from "@/screens/layout"

const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email(),
	password: z.string().min(1, "Password is required"),
	rememberme: z.boolean().optional()
})

type LoginSchemaType = z.infer<typeof loginSchema>

function LoginScreen() {
	const { handleLogin, loading, error } = useAuth()
	const router = useRouter()
	const toast = useToast()

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema)
	})

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [validated, setValidated] = useState({
		emailValid: true,
		passwordValid: true
	})

	const navigateToSignup = () => {
		router.push("/signup")
	}

	const onSubmit = async (data: LoginSchemaType) => {
		console.log("onsubmithere!", data)
		try {
			// Call handleLogin with email and password
			const success = await handleLogin(data.email, data.password)

			if (success) {
				// Navigate to the protected home screen on successful login
				router.push("/")
				toast.show({
					placement: "bottom right",
					render: ({ id }) => {
						return (
							<Toast
								nativeID={id}
								variant="solid"
								action="success"
							>
								<ToastTitle>Logged in successfully!</ToastTitle>
							</Toast>
						)
					}
				})
				reset()
			} else {
				// Show an error message if login fails
				// Alert.alert("Error", error || "Login failed. Please try again.")
			}
		} catch (err) {
			// Handle unexpected errors
			// Alert.alert("Error", "An unexpected error occurred. Please try again.")
			console.error("Login error:", err)
		}
	}

	const handleKeyPress = () => {
		Keyboard.dismiss()
		handleSubmit(onSubmit)()
	}

	const handleState = () => {
		setShowPassword((showState) => {
			return !showState
		})
	}

	return (
		<Box className="h-screen justify-center items-center bg-white px-4">
			<VStack
				// className="max-w-[440px] w-full space-y-6"
				space="md"
			>
				<VStack>
					<Heading
						size="2xl"
						className="text-center"
					>
						Login to your Account
					</Heading>
					{/* <Text>Welcome back</Text> */}
				</VStack>
			</VStack>
			<VStack className="w-full">
				<VStack
					space="xl"
					className="w-full"
				>
					{/* email section */}
					<FormControl
						isInvalid={!!errors?.email || !validated.emailValid}
						className="w-full"
					>
						<FormControlLabel>
							<FormControlLabelText>Email</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="email"
							control={control}
							rules={{
								validate: async (value) => {
									try {
										await loginSchema.parseAsync({ email: value })
										return true
									} catch (error: any) {
										return error.message
									}
								}
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										placeholder="Enter email"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType="done"
									/>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon as={AlertTriangle} />
							<FormControlErrorText>{errors?.email?.message || (!validated.emailValid && "Email ID not found")}</FormControlErrorText>
						</FormControlError>
					</FormControl>

					{/* Password section*/}
					<FormControl
						isInvalid={!!errors.password || !validated.passwordValid}
						className="w-full"
					>
						<FormControlLabel>
							<FormControlLabelText>Password</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="password"
							control={control}
							rules={{
								validate: async (value) => {
									try {
										await loginSchema.parseAsync({ password: value })
										return true
									} catch (error: any) {
										return error.message
									}
								}
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										type={showPassword ? "text" : "password"}
										placeholder="Enter password"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType="done"
									/>
									<InputSlot
										onPress={handleState}
										className="pr-3"
									>
										<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
									</InputSlot>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon as={AlertTriangle} />
							<FormControlErrorText>{errors?.password?.message || (!validated.passwordValid && "Password was incorrect")}</FormControlErrorText>
						</FormControlError>
					</FormControl>

					{/* rememberme section */}
					<HStack
						// className="flex flex-row justify-between items-center w-full px-2"
						style={{ justifyContent: "space-between", padding: 2 }}
					>
						<Controller
							name="rememberme"
							defaultValue={false}
							control={control}
							render={({ field: { onChange, value } }) => (
								<Checkbox
									// className="flex-shrink-0"
									size="sm"
									value="Remember me"
									isChecked={value}
									onChange={onChange}
									aria-label="Remember me"
								>
									<CheckboxIndicator>
										<CheckboxIcon as={CheckIcon} />
									</CheckboxIndicator>
									<CheckboxLabel>Remember me</CheckboxLabel>
								</Checkbox>
							)}
						/>
						<Link href="/auth/forgot-password">
							<LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">Forgot Password?</LinkText>
						</Link>
					</HStack>
				</VStack>

				{/* Google section */}
				<VStack
					className="w-full  my-7 "
					space="lg"
				>
					<Button
						className="w-full"
						onPress={handleSubmit(onSubmit)}
					>
						<ButtonText className="font-medium">Log in</ButtonText>
					</Button>
					<Button
						variant="outline"
						action="secondary"
						className="w-full gap-1"
						onPress={() => {}}
					>
						<ButtonText className="font-medium">Continue with Google</ButtonText>
						<ButtonIcon as={GoogleIcon} />
					</Button>
				</VStack>
				{/* dont have account section */}
				<HStack
					className="justify-center"
					space="sm"
				>
					<Text size="md">Don't have an account?</Text>
					<Link href="/signup">
						<LinkText
							className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
							size="md"
						>
							Sign up
						</LinkText>
					</Link>
				</HStack>
			</VStack>
		</Box>
	)
}

export const SignIn = () => {
	return (
		<AuthLayout>
			<LoginScreen />
		</AuthLayout>
	)
}
