import React, { useState, useEffect, useContext  } from 'react'
import * as api from '../../network/api'
import movieIcon from '../../assets/img/hotel-large-icon.png'
import { Row, Col, Form, Container, Button } from 'react-bootstrap'
import { SelectedHotelContext } from '../SelectedHotelContext';
import { validate } from '../validate'



function Booking(props) {

    //getting context provider states
    const { bookingDetails } = useContext(SelectedHotelContext)
    const { selectedHotel } = useContext(SelectedHotelContext)
    const { maxRoomsAvailable } = useContext(SelectedHotelContext)
    //const bookingInfo = JSON.stringify(bookingDetails, null, 2)

    //form valdiations

    const intialValues = {
        number_of_rooms: bookingDetails.number_of_rooms,
        arrival: bookingDetails.arrival,
        departure: bookingDetails.departure
    }

    const [formValues, setFormValues] = useState(intialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = () => {
        console.log(formValues)
        api.postBooking(selectedHotel._id, formValues.number_of_rooms, formValues.arrival, formValues.departure)

    }

    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues, maxRoomsAvailable,true))
        setIsSubmitting(true)
    }

    //form validation handler
   /*  const validate = (values) => {
        let errors = {}
        var isNumbers = /^[0-9]+$/;
        if (!values.number_of_rooms) {
            errors.number_of_rooms = "number_of_rooms is required"
        } else if (!isNumbers.test(values.number_of_rooms)) {
            errors.number_of_rooms = 'Please type number of rooms in digits';
        } else if (values.number_of_rooms > maxRoomsAvailable){
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
    } */

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit()
        }
    }, [formErrors, isSubmitting])

    
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs sm="8" md="9" className="hotelContainer">
                    
                    <Row>
                        <Col>
                            <img alt="" className="icon" src={movieIcon} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="mb-3">
                            <h2 className="text-center">{selectedHotel.name}</h2>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col xs="12" sm="12" className="pl-4 pr-5">
                            <dl>
                                <dt>City:</dt>
                                <dd>{selectedHotel.city}</dd>
                            </dl>
                        </Col>
                        <Col xs="12" sm="12" className="pl-4 pr-5">
                            <dl>
                                <dt>Price:</dt>
                                <dd>{selectedHotel.price} Kr</dd>
                            </dl>

                        </Col>
                        <Col xs="12" sm="12" className="pl-4 pr-5">
                            <dl>
                                <dt>Maximum available rooms:</dt>
                                <dd>{maxRoomsAvailable} </dd>
                            </dl>
                        </Col>
                    </Row>
                    {Object.keys(formErrors).length === 0 && isSubmitting && (
                        <div className="success-msg alert alert-success ml-2 mr-4 text-center">Booking done successfully</div>
                    )}
                    <form className="mt-5" onSubmit={handleSubmit} noValidate>
                        <Container>
                            
                            <Row>
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
                                    <label htmlFor="departure">Departure date</label>
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
                                    <Form.Group className="m-0" >
                                        <label htmlFor="number_of_rooms">Number of rooms</label>
                                        <Form.Control name="number_of_rooms" placeholder="Number of rooms..."
                                            onChange={handleChange}
                                            value={formValues.number_of_rooms}
                                            className={formErrors.number_of_rooms && "input-error"}
                                        />
                                        {formErrors.number_of_rooms && (
                                            <span className="error">{formErrors.number_of_rooms}</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col className="mt-2">
                                    <Button type="submit" className="btn-primary btn mt-4 btn-sm" >
                                        Book now
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Container>
                    </form>

                </Col>
            </Row>
            
        </Container>
    );
}
export default Booking;