
export const validate = (values, maxRoomsAvailable, isBookingForm) => {
    let errors = {}
    var isNumbers = /^[0-9]+$/

    if (!isBookingForm && !values.city) {
        errors.city = "City is required"
    }

    if (!values.number_of_rooms) {
        errors.number_of_rooms = "number of rooms is required"
    } else if (!isNumbers.test(values.number_of_rooms)) {
        errors.number_of_rooms = 'Please type number of rooms in digits';
    } else if (values.number_of_rooms > maxRoomsAvailable) {
        errors.number_of_rooms = 'Please enter number of rooms less than equal to available rooms'
    }
    if (!values.arrival) {
        errors.arrival = "Arrival date is required"
    } else if (values.arrival > values.departure) {
        errors.arrival = "Arrival date should be less than departure date"
    }

    if (!values.departure) {
        errors.departure = "Departure date is required"
    } else if (values.departure < values.departure) {
        errors.arrival = "Arrival date should be less than departure date"
    }


    return errors
}


