import { configureStore } from '@reduxjs/toolkit'
import reviewsReducer from './slices/reviewsSlice'
import eventsReducer from './slices/eventsSlice'
import cookieReducer from './slices/cookieSlice'

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    events: eventsReducer,
    cookies: cookieReducer,
  },
})

