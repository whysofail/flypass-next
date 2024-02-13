"use client";
import { useSession } from "next-auth/react";
import UserBookings from "../../Components/Booking/UserBookings";
import useDataFetching from "../../Hooks/useDataFetching";

const Booking = () => {
  const { data: session, status } = useSession();
  const url = "http://localhost:5000/v1/bookings";

  // Check if session exists and contains token before fetching data
  const authToken = session?.accessToken || null;

  // Call the custom hook to fetch data only if authToken is available
  const { data, isLoading, error } = useDataFetching(
    url,
    authToken && status === "authenticated" ? authToken : null,
  );

  return (
    <div className="flex items-center justify-center">
      {data?.booking.map((bookings, index) => (
        <UserBookings key={index} booking={bookings} />
      ))}
    </div>
  );
};

export default Booking;
