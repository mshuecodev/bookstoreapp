import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { saveToken, getToken, deleteToken, saveRefreshToken, getRefreshToken, deleteRefreshToken } from "@/services/secureStoreService"
import { loginUser, refreshToken, registerUser } from "@/services/authService"
import { AuthState } from "./authTypes"

// Initial state
const initialState: AuthState = {
	token: null,
	isAuthenticated: false,
	loading: false,
	error: null
}

// Async thunk for user registration
export const register = createAsyncThunk("auth/register", async (payload: { email: string; password: string }, thunkAPI) => {
	try {
		// Call the API to register the user
		await registerUser(payload)

		// Automatically log the user in after registration
		const loginResponse = await loginUser({ email: payload.email, password: payload.password })
		await saveToken(loginResponse.accessToken)
		await saveRefreshToken(loginResponse.refreshToken)

		return loginResponse
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.message || "Registration failed")
	}
})

// Async thunk for user login
export const login = createAsyncThunk("auth/login", async (credentials: { email: string; password: string }, thunkAPI) => {
	try {
		const response = await loginUser(credentials)
		await saveToken(response.accessToken)
		await saveRefreshToken(response.refreshToken)

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

// Auth slice
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Logout action
		logout: (state) => {
			state.token = null
			state.isAuthenticated = false
			deleteToken()
			deleteRefreshToken()
		}
	},
	extraReducers: (builder) => {
		// Login cases
		builder
			.addCase(login.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
				state.loading = false
				state.token = action.payload.accessToken
				state.isAuthenticated = true
			})
			.addCase(login.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
			})

		// Register cases
		builder
			.addCase(register.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(register.fulfilled, (state) => {
				state.loading = false
				state.error = null
			})
			.addCase(register.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
			})

		// Refresh token cases
		// builder
		// 	.addCase(refreshAuthToken.fulfilled, (state, action: PayloadAction<string>) => {
		// 		state.token = action.payload
		// 	})
		// 	.addCase(refreshAuthToken.rejected, (state, action: PayloadAction<any>) => {
		// 		state.error = action.payload
		// 	})
	}
})

// Export actions and reducer
export const { logout } = authSlice.actions
export default authSlice.reducer
