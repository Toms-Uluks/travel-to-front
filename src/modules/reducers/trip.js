
const initialState = {
    trip: {
        created_at: "",
        departureTime: "",
        driver_id: null,
        from: "",
        id: null,
        numberOfPassengers: null,
        price: "",
        requiresContact: true,
        status: "",
        to: "",
        updated_at: "",
    }
  };
  
  const trip = (state = initialState, action) => {
    switch (action.type) {
      case "SET_ACTIVE_TRIP": {
        return {
          trip: action.trip
        }
      }
      default:
        return state
    }
  }
  
  export default trip