import React, { useContext, useState, useMemo} from 'react';
import { Route } from 'react-router-dom'
import Search from '../components/Search'
import Booking from '../components/Booking'
import { SelectedHotelContext } from './SelectedHotelContext';

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
                <Route path="/" exact component={Search} />
                <Route path="/booking/" exact component={Booking} /> 
            </SelectedHotelContext.Provider>
            
            {/* <Route path="/" exact component={Search} />
            <Route path="/result/:search" exact component={Result} />
            <Route path={popular.path} exact component={PopularMovies} />
            <Route path={upcoming.path} exact component={UpcomingMovies} />
            <Route path="/movie/:id" exact component={MovieDetail} /> */}
        </>
    )
}
export default Main;