import {createStore} from 'redux'

initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return initialState.good + 1
    case 'OK':
      return initialState.ok + 1
    case 'BAD':
      return initialState.bad - 1
    case 'ZERO':
      return initialState = 0
    default: return state
  }
  
}

const store = createStore(counterReducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('storeNow: ', storeNow)
})


store.dispatch({type: 'GOOD'})
store.dispatch({type: 'GOOD'})
store.dispatch({type: 'GOOD'})
store.dispatch({ type: 'ZERO' })
store.dispatch({ type: 'BAD' })


const actionGood = {
  type: 'GOOD'
}

const actionOk = {
  type: 'OK'
}

const actionBad = {
  type: 'BAD'
}

const actionZero = {
  type: 'ZERO'
}




export default counterReducer
