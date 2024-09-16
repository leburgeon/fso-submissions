const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_FILTER':
      return action.payload
  }
  return state
}

// action creator function returns an action that when passed to the filter reducer would change the value of the state
export const changeFilter = (filter) => {
  return {
    type: 'NEW_FILTER',
    payload: filter
  }
}

export default filterReducer