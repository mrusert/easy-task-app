import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: ''  // Initialize search term
};

const listSearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;  // Set the search term
        }
    }
});

export const { setSearchTerm } = listSearchSlice.actions;
export const selectSearchTerm = state => state.search.searchTerm;  // Selector for the search term
export default listSearchSlice.reducer;