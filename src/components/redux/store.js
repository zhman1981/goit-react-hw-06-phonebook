import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from './contactsSlice'
import reducer from './filterSlice'

export const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer,
        filter: reducer,
    },
})