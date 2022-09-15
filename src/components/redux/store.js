import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './contactsSlice'
import reducer2 from './filterSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedContactsReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: {
        contacts: persistedContactsReducer,
        filter: reducer2,
    },
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;

export const persistor = persistStore(store);