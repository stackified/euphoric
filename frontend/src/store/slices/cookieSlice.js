import { createSlice } from '@reduxjs/toolkit'

const getInitialCookieState = () => {
  const saved = localStorage.getItem('cookiePreferences')
  if (saved) {
    return JSON.parse(saved)
  }
  return {
    accepted: false,
    necessary: true,
    analytics: false,
    marketing: false,
  }
}

const cookieSlice = createSlice({
  name: 'cookies',
  initialState: getInitialCookieState(),
  reducers: {
    acceptAll: (state) => {
      state.accepted = true
      state.necessary = true
      state.analytics = true
      state.marketing = true
      localStorage.setItem('cookiePreferences', JSON.stringify(state))
    },
    rejectAll: (state) => {
      state.accepted = true
      state.necessary = true
      state.analytics = false
      state.marketing = false
      localStorage.setItem('cookiePreferences', JSON.stringify(state))
    },
    updatePreferences: (state, action) => {
      const { necessary, analytics, marketing } = action.payload
      state.accepted = true
      state.necessary = necessary !== undefined ? necessary : state.necessary
      state.analytics = analytics !== undefined ? analytics : state.analytics
      state.marketing = marketing !== undefined ? marketing : state.marketing
      localStorage.setItem('cookiePreferences', JSON.stringify(state))
    },
  },
})

export const { acceptAll, rejectAll, updatePreferences } = cookieSlice.actions
export default cookieSlice.reducer

