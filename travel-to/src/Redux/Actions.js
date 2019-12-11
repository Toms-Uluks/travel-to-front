
const Types = {
    GET_USER: "Get user",
    SET_USER: "Set user"
  };

function getUser(user) {
    return { type: Types.GET_USER, user }
}

function setUser(user) {
    return { type: Types.SET_USER, user }
}

export default {
    getUser,
    setUser,
    Types
};