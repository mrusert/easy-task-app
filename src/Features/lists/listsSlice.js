import { 
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const listsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = listsAdapter.getInitialState({});

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLists: builder.query({
            query: () => '/lists',
            transformResponse: res => {
                const sortedData = res.sort((a, b) => b.id - a.id)
                return listsAdapter.setAll(initialState, sortedData)
            },
            providesTags: (result, error, arg) => [
                { type: 'List', id: "LIST" },
                ...(result?.ids?.map(id => ({ type: 'List', id })) || [])
            ]
        }),
        addNewList: builder.mutation({
            query: initialList => ({
                url: '/lists',
                method: 'POST',
                body: {
                    ...initialList,
                    date: new Date().toISOString(),
                    complete: false,
                    items: []
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'List', id: arg.id}
            ]
        }),
        updateList: builder.mutation({
            query: initialList => ({
                url: `/lists/${initialList.id}`,
                method: 'PUT',
                body: {
                    ...initialList,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'List', id: arg.id}
            ]
        }),
        deleteList: builder.mutation({
            query: ({ id }) => ({
                url: `/lists/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'List', id: arg.id }
            ]
        }),
        updateItems: builder.mutation({
            query: ({listId, items}) => ({
                url: `lists/${listId}`,
                method: 'PATCH',
                body: {items}
            }),
            async onQueryStarted({ listId, items }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getLists', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const list = draft.entities[listId]
                        if (list) {
                            // Directly modify the 'items' array within the found list
                            list.items = items.map(item => {
                                const existingItem = list.items.find(i => i.id === item.id);
                                return existingItem ? { ...existingItem, ...item } : item;
                            });
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })

    })
})

export const {
    useGetListsQuery,
    useAddNewListMutation,
    useUpdateListMutation,
    useDeleteListMutation,
    useUpdateItemsMutation
} = extendedApiSlice

// returns the query result object
export const selectListsResult = extendedApiSlice.endpoints.getLists.select()

// Creates a memoized selector
const selectListsData = createSelector(
    selectListsResult,
    listsResult => listsResult.data // normalized state object with ids and entities 
)

// getSelectors creates these selectors and allows you to rename them with aliases using destructuring
export const {
    selectAll: selectAllLists,
    selectById: selectListById,
    selectIds: selectListIds
} = listsAdapter.getSelectors(state => selectListsData(state) ?? initialState) // pass in a selector that returns the state

// Selector to find a specific item by ID within a specific list
export const selectItemByIdFromList = createSelector(
    selectAllLists,
    (state, { listId, itemId }) => ({ listId, itemId }),
    (lists, { listId, itemId }) => {
        const list = lists.find(list => list.id === listId);
        return list ? list.items.find(item => item.id === itemId) : undefined;
    }
)

// Memoized selector for filtering lists based on a search term
export const selectFilteredLists = createSelector(
    [selectAllLists, (_, searchTerm) => searchTerm.toLowerCase()],
    (lists, searchTerm) => lists.filter(list =>
        list.name.toLowerCase().includes(searchTerm) ||
        list.items.some(item => item.name.toLowerCase().includes(searchTerm))
    )
)