import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { saveToken, deleteToken, saveRefreshToken, deleteRefreshToken, getRefreshToken } from "@/services/secureStoreService"
import { loginUser, refreshToken, registerUser } from "@/services/authService"
import { AuthState } from "./authTypes"
import { RegisterPayload } from "./authTypes"
import { getToken } from "@/services/secureStoreService"

// Initial state
const initialState: AuthState = {
	token: null,
	isAuthenticated: false,
	loading: false,
	error: null,
	user: null
}

// Utility function to handle token saving
const saveTokens = async (accessToken: string, refreshToken: string) => {
	await saveToken(accessToken)
	await saveRefreshToken(refreshToken)
}

// Async thunk for user registration
export const register = createAsyncThunk("auth/register", async (payload: RegisterPayload, thunkAPI) => {
	try {
		// Register the user
		let data = await registerUser(payload)

		// Automatically log the user in after registration
		// const loginResponse = await loginUser({ email: payload.email, password: payload.password })
		await saveTokens(data.accessToken, data.refreshToken)

		return data
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.message || "Registration failed")
	}
})

// Async thunk for user login
export const login = createAsyncThunk("auth/login", async (credentials: { email: string; password: string }, thunkAPI) => {
	try {
		const response = await loginUser(credentials)
		await saveTokens(response.accessToken, response.refreshToken)

		return response
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.message || "Login failed")
	}
})

// Async thunk for refreshing the token
// export const refreshAuthToken = createAsyncThunk("auth/refreshToken", async (_, thunkAPI) => {
// 	try {
// 		const refToken = await getRefreshToken()
// 		if (!refToken) {
// 			return thunkAPI.rejectWithValue("No refresh token available")
// 		}

// 		const response = await refreshToken(refToken)
// 		await saveToken(response.accessToken)
// 		return response.accessToken
// 	} catch (error: any) {
// 		return thunkAPI.rejectWithValue(error.message || "Token refresh failed")
// 	}
// })

export const rehydrateAuth = createAsyncThunk("auth/rehydrate", async (_, thunkAPI) => {
	try {
		let token: string | null = null
		if (typeof window !== "undefined") {
			// Web
			token = await getToken()
		} else {
			// Native
			token = await getToken()
		}
		console.log("rehydrateAuth", token)

		if (token) {
			// Optionally validate token with backend here
			// const user = await fetchUserProfile(token)
			return { accessToken: token /*, user*/ }
		}

		return thunkAPI.rejectWithValue("No token found")
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.message || "Rehydrate failed")
	}
})

// Auth slice
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Logout action
		logout: (state) => {
			state.token = null
			state.isAuthenticated = false
			state.user = null
			deleteToken()
			deleteRefreshToken()
		}
	},
	extraReducers: (builder) => {
		// Handle async thunks
		builder
			// rehydrateAuth
			.addCase(rehydrateAuth.fulfilled, (state, action: PayloadAction<any>) => {
				state.token = action.payload.accessToken
				state.isAuthenticated = true
				// state.user = action.payload.user || null
				state.loading = false
				state.error = null
			})
			.addCase(rehydrateAuth.rejected, (state) => {
				state.token = null
				state.isAuthenticated = false
				state.user = null
				state.loading = false
			})
			.addMatcher(
				(action) => action.type.endsWith("/pending"),
				(state) => {
					state.loading = true
					state.error = null
				}
			)
			.addMatcher(
				(action) => action.type.endsWith("/fulfilled"),
				(state, action: PayloadAction<any>) => {
					state.loading = false
					state.error = null
					if (action.type === "auth/login/fulfilled" || action.type === "auth/register/fulfilled") {
						state.token = action.payload.accessToken
						state.isAuthenticated = true
						state.user = action.payload.user || null
					}
				}
			)
			.addMatcher(
				(action) => action.type.endsWith("/rejected"),
				(state, action: PayloadAction<any>) => {
					state.loading = false
					state.error = action.payload
				}
			)
	}
})

// Export actions and reducer
export const { logout } = authSlice.actions
export default authSlice.reducer
