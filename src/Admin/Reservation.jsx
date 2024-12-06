import React, { useState, useEffect } from 'react';
import ReservationList from '../components/admin/reservation/ReservationList';
import axios from 'axios';
// import AddBookingModal from '../components/admin/reservation/addBookingModal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const options = ['Pending', 'Checked In', 'Checked Out', 'Canceled'];

const Reservation = () => {
  // const DB_HOST = process.env.REACT_APP_DB_HOST;

  // const [booking, setBooking] = useState(null);
  // const [isBookingLoading, setIsBookingLoading] = useState(true);
  // const [selectedStatus, setSelectedStatus] = useState(null); // State for selected status

  // useEffect(() => {
  //   const fetchBooking = async () => {
  //     try {
  //       const response = await axios.get(`${DB_HOST}api/Booking`);
  //       if (response.data) {
  //         setBooking(response.data.reverse());
  //       } else {
  //         console.error('Error fetching bookings: Invalid response data.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching bookings:', error);
  //     } finally {
  //       setIsBookingLoading(false);
  //     }
  //   };

  //   fetchBooking();
  // }, [DB_HOST]);

  // // Filter bookings based on selected status
  // const filteredBookings = selectedStatus
  //   ? booking?.filter(b => b.status === selectedStatus)
  //   : booking;

  return (
    <div className='w-full h-[505px] flex flex-col mb-[130px]'>
      <h1 id='quick-action' className='text-[24px] font-bold'>
        Reservation
      </h1>

    </div>
  );
};

export default Reservation;