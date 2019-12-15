export const getUser = (user) => {
    return { type: 'GET_USER', user }
}

export const setUser = (user) => {
    return { type: 'SET_USER', user }
}

