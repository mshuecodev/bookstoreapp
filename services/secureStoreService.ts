import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

const TOKEN_KEY = "authToken"
const REFRESH_TOKEN_KEY = "refreshToken"

export const saveToken = async (token: string) => {
	if (Platform.OS === "android" || Platform.OS === "ios") {
		await SecureStore.setItemAsync(TOKEN_KEY, token)
	} else if (Platform.OS === "web") {
		localStorage.setItem(TOKEN_KEY, token)
	}
}

export const getToken = async (): Promise<string | null> => {
	return await SecureStore.getItemAsync(TOKEN_KEY)
}

export const deleteToken = async () => {
	await SecureStore.deleteItemAsync(TOKEN_KEY)
}

export const saveRefreshToken = async (refreshToken: string) => {
	await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
}

export const getRefreshToken = async (): Promise<string | null> => {
	return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
}

export const deleteRefreshToken = async () => {
	await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}
