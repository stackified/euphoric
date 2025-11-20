import { createSlice } from '@reduxjs/toolkit'
import eventsData from '../../data/events.json'

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: eventsData,
    loading: false,
    error: null,
  },
  reducers: {
    // Events are now static - edit events.json to update
  },
})

export default eventsSlice.reducer
