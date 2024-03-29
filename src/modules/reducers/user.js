
const initialState = {
  user: {
    id:	null,
    username: '',
    email: '',
    password: '',
    profile_img: '',
    description: '',
  }
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        user: action.user
      }
    }
    default:
      return state
  }
}

export default user