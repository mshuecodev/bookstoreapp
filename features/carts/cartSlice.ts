import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartState, CartItem } from "./cartTypes"

const initialState: CartState = {
	items: [],
	totalAmount: 0
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existingItem = state.items.find((item) => item.book.id === action.payload.book.id)
			if (existingItem) {
				existingItem.quantity += action.payload.quantity
			} else {
				state.items.push(action.payload)
			}
			state.totalAmount += action.payload.book.price * action.payload.quantity
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const index = state.items.findIndex((item) => item.book.id === action.payload)
			if (index !== -1) {
				const item = state.items[index]
				state.totalAmount -= item.book.price * item.quantity
				state.items.splice(index, 1)
			}
		}
	}
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
