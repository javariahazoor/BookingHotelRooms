import React, { useState, useEffect, useContext } from 'react'
import * as api from '../../network/api'
import { Row, Col, Form, Container } from 'react-bootstrap'
import Hotel from '../Hotels/Hotel'
import { SelectedHotelContext } from '../SelectedHotelContext'



export const Search = (props) => {
    let total = 0
    //state for sharing data between componenets
    const { bookingDetails, setBookingDetails } = useContext(SelectedHotelContext)
    const { selectedHotel, setSelectedHotel } = useContext(SelectedHotelContext)
    const { maxRoomsAvailable, setMaxRoomsAvailable } = useContext(SelectedHotelContext)
    //these states will store the api response
    const [hotels, setHotels] = React.useState([])
    const [bookings, setBookings] = React.useState([])

    //form validation

    const intialValues = { 
        city: "",
        number_of_rooms: 1,
        arrival: "",
        departure: "",
        maxPrice: 3000
     }

    const [formValues, setFormValues] = useState(intialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    //form submission
    const submit = () => {
        api.getBookings(formValues.arrival, formValues.departure).then(
            bookingList => setBookings(bookingList)
        )
        api.search(formValues.city, formValues.maxPrice).then(hotelList => setHotels(hotelList))
        setBookingDetails(formValues)
    }

    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmitting(true)
    }

    //form validation handler
    const validate = (values) => {
        let errors = {}
        var isNumbers = /^[0-9]+$/;
        if (!values.city) {
            errors.city = "City is required"
        }

        if (!values.number_of_rooms) {  
            errors.number_of_rooms = "number_of_rooms is required"
        } else if (!isNumbers.test(values.number_of_rooms)) {
            errors.number_of_rooms = 'Please type number of rooms in digits';
        }

        if (!values.arrival) {
            errors.arrival = "arrival date is required"
        }

        if (!values.departure) {
            errors.departure = "departure date is required"
        }

        if (!values.maxPrice) {
            errors.maxPrice = "maxPrice is Required"
        } else if (!isNumbers.test(values.maxPrice)) {
            errors.maxPrice = 'Please type price in number';
        }

        return errors
    }
    //validates the form and than submit
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit()
        }
    }, [formErrors])

    return (
        <>
            {/* form */}
            {Object.keys(formErrors).length === 0 && isSubmitting && (
                <span className="success-msg ml-auto mr-auto text-center">Form submitted successfully</span>
            )}
            <form className="mt-5" onSubmit={handleSubmit} noValidate>
               <Container>
                   
                    <Row className=" justify-content-md-center" form="true">
                        <Col md="6" lg="6" xs="6" >
                            <label htmlFor="city">City</label>
                            <Form.Group className="m-0" >
                                <Form.Control
                                    name="city"
                                    onChange={handleChange}
                                    className={formErrors.city && "input-error"}
                                    as="select" custom>
                                    <option value="select">Please select</option>
                                    <option value="Oslo">Oslo</option>
                                    <option value="Trondheim">Trondheim</option>
                                    <option value="Møre og Romsdal">Møre og Romsdal</option>
                                </Form.Control>
                                {formErrors.city && (
                                    <span className="error">{formErrors.city}</span>
                                )}
                            </Form.Group>

                            
                        </Col>
                        <Col md="6" lg="6" xs="6" >
                            <Form.Group className="m-0" >
                                <label htmlFor="number_of_rooms">Number of rooms</label>
                                <Form.Control name="number_of_rooms" 
                                    onChange={handleChange}
                                    value={formValues.number_of_rooms}
                                    className={formErrors.number_of_rooms && "input-error"}
                                />
                                {formErrors.number_of_rooms && (
                                    <span className="error">{formErrors.number_of_rooms}</span>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                
                    <Row className=" justify-content-md-center" form="true">
                        <Col md="6" lg="6" xs="6" >
                            <label htmlFor="arrival">Arrival date</label>
                            <Form.Group className="m-0" >
                                <Form.Control name="arrival"
                                    type="date"
                                    onChange={handleChange}
                                    value={formValues.arrival}
                                    className={formErrors.arrival && "input-error"}
                                />
                                {formErrors.arrival && (
                                    <span className="error">{formErrors.arrival}</span>
                                )}
                            </Form.Group>

                        </Col>
                        <Col md="6" lg="6" xs="6" >
                            <label htmlFor="departure">Number of rooms</label>
                            <Form.Group className="m-0" >
                                <Form.Control
                                    type="date"
                                    name="departure"
                                    onChange={handleChange}
                                    value={formValues.departure}
                                    className={formErrors.departure && "input-error"}
                                />
                                {formErrors.departure && (
                                    <span className="error">{formErrors.departure}</span>
                                )}
                            </Form.Group>


                        </Col>
                    </Row>
                
                    <Row className=" justify-content-md-center" form="true">
                        <Col md="6" lg="6" xs="6" >
                            <label htmlFor="maxPrice">maxPrice</label>
                            <Form.Group className="m-0" >
                                <Form.Control 
                                    name="maxPrice"
                                    onChange={handleChange}
                                    value={formValues.maxPrice}
                                    className={formErrors.maxPrice && "input-error"}
                                />
                                {formErrors.maxPrice && (
                                    <span className="error">{formErrors.maxPrice}</span>
                                )}
                            </Form.Group>
                        </Col>
                        <Col className="mt-2" md="6" lg="6" xs="6" >
                            <button className="btn btn-primary mt-4 btn-sm" type="submit">
                                Search
                            </button>
                        </Col>
                    </Row>
                
               </Container>
                
            </form>
            {/* results */}
            <Container >
                <Row>
                    <Col xs="12"> <h1 className="primaryHeading text-white">Search Results...</h1></Col>
                    {hotels.length > 0 && hotels.map(hotel => (
                        <> 
                            <div className="hide">{total=0}</div>
                            {   
                                bookings.find((booking) => {
                                    if(booking.hotel_id === hotel._id){
                                        total = total + booking.number_of_rooms
                                    }
                                
                                })
                                
                            }
                            
                            <Hotel key={hotel._id} 
                                alreadyBookedRoom={total}  
                                hotel={hotel} 
                                arrival={formValues.arrival} 
                                departure={formValues.departure}
                                addSelectedHotel={props.addSelectedHotel}
                                setSelectedHotel={setSelectedHotel}
                                setMaxRoomsAvailable={setMaxRoomsAvailable} />
                        </>
                    ))}

                </Row>
            </Container>
        </>
    )
}
export default Search