import { createSlice } from '@reduxjs/toolkit'
import reviewsData from '../../data/reviews.json'

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: reviewsData,
    loading: false,
    error: null,
  },
  reducers: {
    // Reviews are now static - only EmailJS sends them
    // You can manually add reviews to reviews.json file
  },
})

export default reviewsSlice.reducer
