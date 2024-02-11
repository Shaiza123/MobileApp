import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {id: null, email: null,postId: null, firstLaunch: true},
  loading:true
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isFirstLaunch:(state, action) => {
      const {firstLaunch} = action.payload
      const user =  {firstLaunch:firstLaunch}
      state.user = user
    },
    login: (state,action) => {
      const {id,email,postId} = action.payload
      const user = {id:id,email:email,postId:postId}
      state.user = user
    },
    signout: (state) => {
      state.user = {id: '', email: '',postId: '',}
    },
    setLoading: (state,action) => {
      state.loading = action.payload.loading
    },  
  },
})

// Action creators are generated for each case reducer function
export const {isFirstLaunch, login, signout} = userSlice.actions

export default userSlice.reducer