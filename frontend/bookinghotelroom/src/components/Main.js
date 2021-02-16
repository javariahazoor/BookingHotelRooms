import React, { useContext, useState, useMemo} from 'react';
import { Route, Switch} from 'react-router-dom'
import Search from '../components/Search'
import Booking from '../components/Booking'
import { SelectedHotelContext } from './SelectedHotelContext';
import { NotFound } from './NotFound';

export const Main = () => {
    const [selectedHotel, setSelectedHotel] = useState(null)
    const [bookingDetails, setBookingDetails] = useState(null)
    const [maxRoomsAvailable, setMaxRoomsAvailable] = useState(null)

    const value = useMemo(() => (
        { selectedHotel, setSelectedHotel, bookingDetails, setBookingDetails, maxRoomsAvailable, setMaxRoomsAvailable}
        ), 
        [selectedHotel, setSelectedHotel, bookingDetails, setBookingDetails, maxRoomsAvailable, setMaxRoomsAvailable]);
    
    return (
        <>
            <SelectedHotelContext.Provider value={value}>
                <Switch>
                    <Route path="/" exact component={Search} />
                    <Route path="/booking/" exact component={Booking} /> 
                    <Route path="*" component={NotFound} /> 
                </Switch>
            </SelectedHotelContext.Provider>
         
        </>
    )
}
export default Main;