"use client";
import UserBookings from "../../Components/Booking/UserBookings";
import { useSession } from "next-auth/react";
import useDataFetching from "../../Hooks/useDataFetching";
import axios from "axios";
import { useEffect, useState } from "react";

const Booking = () => {
  const baseURL = "http://localhost:5000/v1";
  const [booking, setBooking] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, loading } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const response = await fetch(`${baseURL}/bookings`, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch bookings");
          }
          const data = await response.json();
          setBooking(data.booking);
          setSearchResult(data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearchBookingByCode = async (bookingCode) => {
    try {
      console.log(bookingCode);
      const response = await axios.get(
        `${baseURL}/search?bookingcode=${bookingCode}`, // Fixed baseURL
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`, // Used session.accessToken
          },
        },
      );
      const searchData = response.data;
      setSearchResult(searchData.booking);
    } catch (err) {
      console.error("Error searching booking by code:", err);
    }
  };

  // Function to reset search result
  const resetSearch = () => {
    setSearchResult(booking); // Changed to use booking state
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-3">
        <input
          type="text"
          className="input input-bordered"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search bookings by code"
        />
        <button
          className="btn"
          onClick={() => handleSearchBookingByCode(searchQuery)}
        >
          Search
        </button>
        <button className="btn btn-error" onClick={resetSearch}>
          Reset
        </button>
      </div>

      {searchResult && searchResult.length > 0 && (
        <div className="py-24 flex flex-col w-full items-center justify-center gap-4">
          <h2 className="font-bold text-lg">Search Result</h2>
          {searchResult.map((booking, index) => (
            <UserBookings key={index} booking={booking} />
          ))}
        </div>
      )}

      {booking.length > 0 && (
        <div className="py-24 flex flex-col w-full items-center justify-center gap-4">
          <h2 className="font-bold text-lg">Your Bookings</h2>
          {booking.map((booking, index) => (
            <UserBookings key={index} booking={booking} />
          ))}
        </div>
      )}

      {searchResult && searchResult.length === 0 && (
        <div className="py-24 flex flex-col w-full items-center justify-center gap-4">
          <h2 className="font-bold text-lg">No Data Found</h2>
        </div>
      )}
    </div>
  );
};

export default Booking;
