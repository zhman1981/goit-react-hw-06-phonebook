import { createSlice } from "@reduxjs/toolkit"

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
      changeFilter(state, action) {
        return action.payload
    },
  },
})

const { actions, reducer } = filterSlice
export const { changeFilter } = actions
export default reducer