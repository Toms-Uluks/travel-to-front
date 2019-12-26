
const initialState = {
    trip: {
        created_at: "",
        departure_time: "",
        driver_id: null,
        from: "",
        id: null,
        number_of_passengers: null,
        price: "",
        requires_contact: true,
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