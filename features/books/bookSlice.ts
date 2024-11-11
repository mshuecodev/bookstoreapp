import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { fetchBooks as fetchBooksFromService } from "@/services/bookService"
import { Book, BooksState } from "./bookTypes"

const initialState: BooksState = {
	list: [],
	loading: false,
	error: null
}

// Use the service method here in a thunk
export const fetchBooks = createAsyncThunk<Book[], void>("books/fetchBooks", async (_, thunkAPI) => {
	try {
		return await fetchBooksFromService()
	} catch (error) {
		return thunkAPI.rejectWithValue("Failed to fetch books")
	}
})

const bookSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		addBook: (state, action: PayloadAction<Book>) => {
			state.list.push(action.payload)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooks.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.loading = false
				state.list = action.payload
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	}
})

export const { addBook } = bookSlice.actions
export default bookSlice.reducer
