export const setActiveTrip = (trip) => {
    console.log(trip)
    return { type: 'SET_ACTIVE_TRIP', trip }
}

export const setUser = (user) => {
    return { type: 'SET_USER', user }
}


