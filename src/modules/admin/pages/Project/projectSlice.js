import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        filter: {
            page: 0,
            perPage: 10,
            rowCount: '',
            filterText: ''
        }
    },
    reducers: {
        setFilter: (state, action) => {
            const values = action.payload;
            Object.entries(values).forEach((key) => {
                state.filter[key[0]] = key[1]
            });
        },
        clearFilter: (state) => {
            state.filter = {
                page: 0,
                perPage: 10,
                rowCount: '',
                filterText: ''
            }
        }
    },

});

export const { setFilter,clearFilter } = projectSlice.actions;

export default projectSlice.reducer;
