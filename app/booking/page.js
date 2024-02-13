"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UserBookings from "../../Components/Booking/UserBookings";
import useDataFetching from "../../Hooks/useDataFetching";
import axios from "axios";

const Booking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const { data: session, status } = useSession();
  const url = "http://localhost:5000/v1/bookings";

  // Check if session exists and contains token before fetching data
  const authToken = session?.accessToken || null;

  // Call the custom hook to fetch data
  const { data, isLoading, error } = useDataFetching(
    url,
    authToken && status === "authenticated" ? authToken : null,
  );

  useEffect(() => {
    // Initialize searchResult with default data on component mount
    setSearchResult(data?.booking);
  }, [data]);

  const handleSearchBookingByCode = async (bookingCode) => {
    try {
      console.log(bookingCode);
      const response = await axios.get(
        `${url}/search?bookingcode=${bookingCode}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
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
    setSearchResult(data?.booking);
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


      {!searchResult && (
        <div className="py-24 flex flex-col w-full items-center justify-center gap-4">
          <h2 className="font-bold text-lg">Your Bookings</h2>
          {data?.booking.map((booking, index) => (
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
