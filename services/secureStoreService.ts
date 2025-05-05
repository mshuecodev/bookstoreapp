import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

const TOKEN_KEY = "authToken"
const REFRESH_TOKEN_KEY = "refreshToken"

export const saveToken = async (token: string) => {
	console.log("save login here", Platform.OS)
	if (Platform.OS === "android" || Platform.OS === "ios") {
		await SecureStore.setItemAsync(TOKEN_KEY, token)
	} else if (Platform.OS === "web") {
		localStorage.setItem(TOKEN_KEY, token)
	}
}

export const getToken = async (): Promise<string | null> => {
	if (Platform.OS === "android" || Platform.OS === "ios") {
		return await SecureStore.getItemAsync(TOKEN_KEY)
	} else if (Platform.OS === "web") {
		return localStorage.getItem(TOKEN_KEY)
	} else {
		return null
	}
}

export const deleteToken = async () => {
	if (Platform.OS === "android" || Platform.OS === "ios") {
		await SecureStore.deleteItemAsync(TOKEN_KEY)
	} else if (Platform.OS === "web") {
		localStorage.removeItem(TOKEN_KEY)
	}
}

export const saveRefreshToken = async (refreshToken: string) => {
	if (Platform.OS === "android" || Platform.OS === "ios") {
		await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
	} else if (Platform.OS === "web") {
		localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
	}
}

export const getRefreshToken = async (): Promise<string | null> => {
	if (Platform.OS === "android" || Platform.OS === "ios") {
		return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
	} else if (Platform.OS === "web") {
		return localStorage.getItem(REFRESH_TOKEN_KEY)
	} else {
		return null
	}
}

export const deleteRefreshToken = async () => {
	if (Platform.OS === "android" || Platform.OS === "ios") {
		await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
	} else if (Platform.OS === "web") {
		localStorage.removeItem(REFRESH_TOKEN_KEY)
	}
}
