
const initialState = {
  user: {
    id:	null,
    username: '',
    email: '',
    password: '',
    profileImg: '',
    description: '',
  }
};

function travelTo(state = initialState, action) {
  switch (action.type) {
    case "Get user": {
      return {
        user: action.user
      }
    }
    case "Set user": {
      return {
        user: action.user
      }
    }
    default:
      return state
  }
}

export default travelTo