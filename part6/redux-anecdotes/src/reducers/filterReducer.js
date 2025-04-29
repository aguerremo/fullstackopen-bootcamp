const filterReducer = (state = 'ALL', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.data
    default:
      return state  
  }
}

export const filterChange = filter => {
  return {
    type:'FILTER',
    pay: filter
  }
}

export default filterReducer