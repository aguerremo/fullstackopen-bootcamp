import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name:'filter',
  initialState: '',
  reducers:{
    filterAction(state, action) {
      return action.payload
    },

  }
})

export default filterSlice.reducer
export const { filterAction } = filterSlice.actions 