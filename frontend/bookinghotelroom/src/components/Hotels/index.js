import React from 'react';
import * as api from '../../network/api'
import { Container, Row, Col } from 'react-bootstrap'
import Hotel from './Hotel'

function Spinner() {
    return (
        <Container className="text-center">
            Loading
        </Container>
    );
}
/**
 * This module is to show all hotels in database but not using it right now
 */
const Hotels = () => {

    const [hotels, setHotels] = React.useState([]);

    React.useEffect(() => {
        api.getHotels().then(hotelList => setHotels(hotelList))
    }, []); 

    if (!hotels) {
        return <Spinner />;
    }
    return (
        <Container>
            <Row>
                <Col xs="12">
                    <h2 className="primaryHeading">Hotels</h2>
                </Col>
                {hotels.map(hotel => (
                    <Hotel key={hotel._id} hotel={hotel} />
                ))}
            </Row>
        </Container>
    );
}
export default Hotels;