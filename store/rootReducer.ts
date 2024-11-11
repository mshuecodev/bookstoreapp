import { combineReducers } from "redux"
import userReducer from "@/features/user/userSlice"
import bookReducer from "@/features/books/bookSlice"
import cartReducer from "@/features/carts/cartSlice"

const rootReducer = combineReducers({
	user: userReducer,
	books: bookReducer,
	cart: cartReducer

	// Add other slices here
})

export default rootReducer
