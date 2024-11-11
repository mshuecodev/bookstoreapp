import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/services/apiClient"
import { RootState } from "@/store"
import { UserProfile, UserState } from "./userTypes"

const initialState: UserState = {
	isAuthenticated: false,
	profile: null,
	isLoading: false,
	error: null
}

export const fetchUserProfile = createAsyncThunk<UserProfile, number>("user/fetchUserProfile", async (userId, thunkAPI) => {
	const response = await api.getUserProfile(userId)
	return response.data
})

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserProfile>) {
			state.profile = action.payload
			state.isAuthenticated = true
		},
		logout(state) {
			state.profile = null
			state.isAuthenticated = false
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProfile.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.isLoading = false
				state.profile = action.payload
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message || "Failed to fetch user profile"
			})
	}
})

export const { setUser, logout } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer
