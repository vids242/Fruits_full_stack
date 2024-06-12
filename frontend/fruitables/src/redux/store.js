import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { RootReducer } from './reduces'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const storeReduces = () => {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['facilites','counter']
    }

    const persistedReducer = persistReducer(persistConfig, RootReducer)

    const store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}
