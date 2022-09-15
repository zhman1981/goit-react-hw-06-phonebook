import { createSlice } from "@reduxjs/toolkit"

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
      addContact(state, action) {
          return [...state, action.payload]
    },
      deleteContact(state, action) {
        return state.filter(item => item.id !== action.payload)
    },
  },
})

const { actions, reducer } = contactsSlice
export const { addContact, deleteContact } = actions
export default reducer