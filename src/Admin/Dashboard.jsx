// import React, { useEffect, useState } from 'react';
// import CardOverview from '../components/admin/dashboard/CardOverview';
// import RoomManagement from '../components/admin/dashboard/CustomTabPanel';
// import { useNavigate } from 'react-router-dom';
// import LineChart from '../components/admin/dashboard/LineChart';

// const Dashboard = () => {
//   const apiUrl = process.env.REACT_APP_API_URL;

//   const [roomImages, setRoomImages] = useState([]);
//   const navigate = useNavigate();

//   const handleImageClick = () => {
//     navigate('/admin/room'); // Navigate to the room management page
//   };

//   useEffect(() => {
//     const getRoomImages = async () => {
//       try {
//         const response = await fetch(`${apiUrl}api/Room`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         const tempRoomImages = data.flatMap(room => room.imagePaths);
//         setRoomImages(tempRoomImages);
//       } catch (error) {
//         console.error('Error fetching room images:', error);
//       }
//     };

//     getRoomImages();
//   }, [apiUrl]);

//   return (
//     <div className="w-full flex flex-row justify-between font-inter gap-[8px]">
//       <div className="w-[60%]">
//         <h1 id="overview" className="text-[20px] font-bold">Overview</h1>
//         <div className="flex flex-col gap-[10px]">
//           <div className="w-full flex rounded-md">
//             <CardOverview isCheckin />
//             <CardOverview isCheckout />
//             <CardOverview isRoomAvailable />
//             <CardOverview isReservation />
//           </div>
//           <div id="images" className="flex items-center gap-[10px] pl-1">
//             {roomImages.slice(2, 7).map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Room ${index}`}
//                 className="w-[140px] h-[100px] rounded-md cursor-pointer"
//                 onClick={handleImageClick}
//               />
//             ))}
//           </div>
//           <LineChart />
//         </div>
//       </div>
//       <RoomManagement />
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;

