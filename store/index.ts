import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"

const store = configureStore({
	reducer: rootReducer
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
	// devTools: process.env.NODE_ENV !== "production",
	// preloadedState
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export { rootReducer } // Optional: Export for testing
export default store
