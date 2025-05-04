import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { saveToken, getToken, deleteToken, saveRefreshToken, getRefreshToken, deleteRefreshToken } from "@/services/secureStoreService"
import { loginUser, refreshToken, registerUser } from "@/services/authService"
import { AuthState } from "./authTypes"

const initialState: AuthState = {
	token: null,
	// refreshToken: null,
	isAuthenticated: false,
	loading: false,
	error: null
}

export const register = createAsyncThunk("auth/register", async (payload: { email: string; password: string }, thunkAPI: { rejectWithValue: (arg0: any) => any }) => {
	try {
		await registerUser(payload) // Call the API
		// Optionally, log the user in automatically after registration
		const loginResponse = await loginUser({ email: payload.email, password: payload.password })
		await saveToken(loginResponse.accessToken)
		return loginResponse
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.message || "Registration failed")
	}
})

export const login = createAsyncThunk("auth/login", async (credentials: { email: string; password: string }, thunkAPI: { rejectWithValue: (arg0: string) => any }) => {
	try {
		const response = await loginUser(credentials)
		console.log("check", response)
		await saveToken(response.accessToken)
		// await saveRefreshToken(response.refreshToken)

		return response
	} catch (error) {
		console.log("error", error)
		return thunkAPI.rejectWithValue("Login failed")
	}
})

export const refreshAuthToken = createAsyncThunk("auth/refreshToken", async (_: any, thunkAPI: { rejectWithValue: (arg0: string) => any }) => {
	const refToken = await getRefreshToken()
	if (!refToken) {
		return thunkAPI.rejectWithValue("No refresh token available")
	}
	try {
		const response = await refreshToken(refToken)
		await saveToken(response.token)
		return response.token
	} catch (error) {
		return thunkAPI.rejectWithValue("Token refresh failed")
	}
})

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state: { token: null; isAuthenticated: boolean }) => {
			state.token = null
			state.isAuthenticated = false
			deleteToken()
			deleteRefreshToken()
		}
	},
	extraReducers: (builder: {
		addCase: (
			arg0: any,
			arg1: (state: any) => void
		) => {
			(): any
			new (): any
			addCase: {
				(arg0: any, arg1: (state: any, action: any) => void): {
					(): any
					new (): any
					addCase: {
						(arg0: any, arg1: (state: any, action: any) => void): { (): any; new (): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): { (): any; new (): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new (): any; addCase: { (arg0: any, arg1: (state: any) => void): { (): any; new (): any; addCase: { (arg0: any, arg1: (state: any, action: any) => void): void; new (): any } }; new (): any } }; new (): any } }; new (): any } }
						new (): any
					}
				}
				new (): any
			}
		}
	}) => {
		builder
			.addCase(login.pending, (state: { loading: boolean }) => {
				state.loading = true
			})
			.addCase(login.fulfilled, (state: { loading: boolean; token: any; isAuthenticated: boolean }, action: { payload: { accessToken: any } }) => {
				state.loading = false
				state.token = action.payload.accessToken
				// state.refreshToken = action.payload.refreshToken
				state.isAuthenticated = true
			})
			.addCase(login.rejected, (state: { loading: boolean; error: string }, action: { payload: string }) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(refreshAuthToken.fulfilled, (state: { token: any }, action: { payload: any }) => {
				state.token = action.payload
			})
			.addCase(register.pending, (state: { loading: boolean }) => {
				state.loading = true
			})
			.addCase(register.fulfilled, (state: { loading: boolean; error: null }) => {
				state.loading = false
				state.error = null
			})
			.addCase(register.rejected, (state: { loading: boolean; error: string }, action: { payload: string }) => {
				state.loading = false
				state.error = action.payload as string
			})
	}
})

export const { logout } = authSlice.actions
export default authSlice.reducer
