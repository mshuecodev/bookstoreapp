import { combineReducers } from "redux"
import userReducer from "@/features/user/userSlice"
import bookReducer from "@/features/books/bookSlice"
import cartReducer from "@/features/carts/cartSlice"
import authReducer from "@/features/auth/authSlice"

const rootReducer = combineReducers({
	user: userReducer,
	books: bookReducer,
	cart: cartReducer,
	auth: authReducer

	// Add other slices here
})

export default rootReducer
