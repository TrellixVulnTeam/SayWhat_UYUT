import axios from 'axios'
import { browserHistory } from 'react-router'

const initialState = {
  text: { 
    sentiment: {
      magnitude:0, 
      score:0
    }, 
    entities: [ {
      wikipediaLink: '',
      name: ''
    } ],
  analysis: {},
  showComponent: false
}
}

/* -------------------------- REDUCER --------------------------- */
const reducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_TEXT:
      return Object.assign({}, state, { text: action.text })
    case CLICK:
      console.log(state.showComponent, "Component")
      let show = !state.showComponent
      console.log('statehow', show, 'state', state.showComponent, "!!!$^#^#", state)
      return Object.assign({}, state, { showComponent: true })
    case STOP:
      return Object.assign({}, state, { showComponent: false })
    case PUSHSCORE:
    console.log("actions", action)
    //   return [action.scoreList, ...action.scores]


    default:
      return state
  }
}

/* --------------------------- ACTIONS -------------------------- */
const GET_TEXT = 'GET_TEXT'
const CLICK = 'CLICK'
const STOP = 'STOP'
const PUSHSCORE = 'PUSHSCORE'
const PUSHMAG = 'PUSHMAG'

/* ---------------------- ACTION CREATOR ------------------------ */
export const getText = text => {
  return {
    type: GET_TEXT, text
  }
}

export const buttonClick = text => {
  return {
    type: CLICK
  }
}

export const buttonUnClick = text => {
  return {
    type: STOP
  }
}

export const pushScore = score => {
  return {
    type: PUSHSCORE, score
  }
}

export const pushMagnitude = mag => {
  return {
    type: PUSHMAG, mag
  }
}

/* ------------------------- DISPATCHER -------------------------- */
export const fetchText = (text) =>
  dispatch =>
    axios.post('/api/text', text)
      .then(res =>
        dispatch(getText(res.data))
      )
      .catch(err => console.error('Fetching text unsuccessful', err))

// export const fetchTextEntities = (text) =>
//   dispatch =>
//     axios.post('/api/text/entities', text)
//       .then(res =>
//         dispatch(getText(res.data))
//       )
//       .catch(err => console.error('Fetching text for entities unsuccessful', err))


export default reducer