const CUSTOMER_ID = '6027e9c5648d423f1cedf14a';
const BASE_URL = 'http://localhost:8000';


//const waitABit = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

/**
 * Getting all hotels
 */
export async function getHotels() {
    //await waitABit(1000);
    const response = await fetch(
        `${BASE_URL}/hotels`,
    );
    const data = await response.json();
    console.log(data)
    return data;
}

/**
 * Getting all bookings on the basis of arrival and departure
 * @param {arrival} arrival 
 * @param {departure} departure 
 */

export async function getBookings(arrival,departure) {
    
    const response = await fetch(
        `${BASE_URL}/booking/range?arrival_date=${arrival}&departure_date=${departure}`
    );
    const data = await response.json();
    console.log(data)
    return data;
}

/**
 * creating booking for a specific hotel adn specific customer 
 * @param {hotel_id} hotel_id 
 * @param {numberOfRooms} numberOfRooms
 * @param {arrival} arrival
 * @param {departure} departure
 */
export async function postBooking(hotel_id, numberOfRooms,arrival,departure) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            customer_id: CUSTOMER_ID,
            hotel_id:hotel_id,
            arrival_date:arrival,
            departure_date:departure,
            number_of_rooms:numberOfRooms
         })
    }
    const response = await fetch(
        `${BASE_URL}/booking`, requestOptions
    );
    const data = await response.json();
    console.log(data)
    return data;
}

/**
 * This fucntion will call api to give search results of hotels on the basis of city and maximum prices
 * @param {city} city 
 * @param {mxPrice} maxPrice 
 */

export async function search(city,maxPrice) {
    const response = await fetch(
        `${BASE_URL}/hotels/search/${city}/${maxPrice}`,
    );
    const data = await response.json();
    console.log(data)
    return data;
}
