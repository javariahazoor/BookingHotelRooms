import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import {  Col } from 'react-bootstrap'
import icon from '../../assets/img/hotel_icon.png';


/**
 * This module for displaying the hotel item  
 */
export const Hotel = (props) => {

    //calculating available rooms
    const available = props.hotel.number_of_rooms - props.alreadyBookedRoom
    
    return (
        <>
            <Col sm="4" md="4" xs="12" >
                <Link
                    onClick={() => {
                        props.setSelectedHotel(props.hotel)
                        props.setMaxRoomsAvailable(available)
                    }}
                 to={`/booking/`}>

                    <div className="hotel-list-item">
                        <h4>
                            <img alt="" className="icon" src={icon} />
                                    Hotel
                                </h4>
                        <figure>
                            <figcaption>{props.hotel.name}</figcaption>
                            <p>{props.hotel.city} </p>
                            <p>Available rooms {available} </p>
                            <p>Price: {props.hotel.price} kr </p>
                            <p>(price is given per room per night) </p>
                            
                        </figure>

                        <div className="hotel-footer"></div>
                    </div>

                </Link>
            </Col>
            
        </>
    )
}
export default Hotel