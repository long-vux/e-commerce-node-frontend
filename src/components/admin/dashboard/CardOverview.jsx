import React, {useState, useEffect} from 'react';
import { Login } from '@mui/icons-material';
import axios from 'axios'

const CardOverview = ({ isCheckin, isCheckout, isRoomAvailable, isReservation }) => {
    const [checkin, setCheckin] = useState(0)
    const [checkout, setCheckout] = useState(0)
    const [roomAvailable, setRoomAvailable] = useState(0)
    const [reservation, setReservation] = useState(0)

    const apiUrl = process.env.REACT_APP_API_URL
    // eslint-disable-next-line
    useEffect(() => {
      const fetchData = async () => {
        try {
          const responseCheckin = await axios.get(`${apiUrl}api/Booking/today-check-in`)
          const responseCheckOut = await axios.get(`${apiUrl}api/Booking/today-check-out`)
          const responseRoomAvailable = await axios.get(`${apiUrl}api/Room/room-available`)
          const responseReservation = await axios.get(`${apiUrl}api/Booking/reservation`)
          setCheckin(responseCheckin.data)
          setCheckout(responseCheckOut.data)
          setRoomAvailable(responseRoomAvailable.data)
          setReservation(responseReservation.data)

        } catch (error) {
          console.error('Error fetching checkin:', error)
        }
      }
      fetchData()
    }, [apiUrl])
    


  return (
    <>
      {isCheckin && (
        <div className='w-[180px] h-[120px] bg-white rounded-md flex flex-col justify-between m-1 p-2 font-inter'>
          <div className='w-full flex items-center justify-between '>
            <Login />
          </div>
          <h1 className='text-[14px] text-gray-500 font-bold'>Today Check In</h1>
          <div className='flex items-center justify-between'>
            <h1 className='text-[20px] text-black'>{checkin}</h1>
          </div>
        </div>
      )}

      {isCheckout && (
        <div className='w-[180px] h-[120px] bg-white rounded-md flex flex-col justify-between m-1 p-2 font-inter'>
          <div className='w-full flex items-center justify-between '>
            <Login />
          </div>
          <h1 className='text-[14px] text-gray-500 font-bold'>Today Check Out</h1>
          <div className='flex items-center justify-between'>
            <h1 className='text-[20px] text-black'>{checkout}</h1>
          </div>
        </div>
      )}

      {isReservation && (
        <div className='w-[180px] h-[120px] bg-white rounded-md flex flex-col justify-between m-1 p-2 font-inter'>
          <div className='w-full flex items-center justify-between '>
            <Login />
          </div>
          <h1 className='text-[14px] text-gray-500 font-bold'>Reservation</h1>
          <div className='flex items-center justify-between'>
            <h1 className='text-[20px] text-black'>{reservation}</h1>
          </div>
        </div>
      )}

      {isRoomAvailable && (
        <div className='w-[180px] h-[120px] bg-white rounded-md flex flex-col justify-between m-1 p-2 font-inter'>
          <div className='w-full flex items-center justify-between '>
            <Login />
          </div>
          <h1 className='text-[14px] text-gray-500 font-bold'>Room Available</h1>
          <div className='flex items-center justify-between'>
            <h1 className='text-[20px] text-black'>{roomAvailable}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default CardOverview;
