import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "@/features/user/userSlice"
import bookReducer from "@/features/books/bookSlice"
import cartReducer from "@/features/carts/cartSlice"
import authReducer from "@/features/auth/authSlice"

const rootReducer = combineReducers({
	user: userReducer, // Handles user-related state
	books: bookReducer, // Handles book-related state
	cart: cartReducer, // Handles cart-related state
	auth: authReducer // Handles authentication state

	// Add other slices here as needed
})

export type RootState = ReturnType<typeof rootReducer>
export { userReducer, bookReducer, cartReducer, authReducer } // Optional: Export individual reducers
export default rootReducer
