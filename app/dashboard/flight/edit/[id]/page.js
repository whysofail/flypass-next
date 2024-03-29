"use client";
import React, { useEffect, useState } from "react";
import FlightFormUpdate from "../../../../../Components/(Dashboard)/Flight/FlightFormUpdate";
import { fetchData } from "../../../../../Helper/fetch";
import { useSession } from "next-auth/react";
import Link from "next/link";
const page = ({ params }) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const url = `http://localhost:5000/v1/flights/${params.id}`;
  useEffect(() => {
    const fetch = async () => {
      try {
        if (session) {
          const data = await fetchData(url, "GET", null, session.accessToken);
          setData(data.flights);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [session]);
  return (
    <>
      <Link href="/dashboard/flight" className="btn mb-2">
        Back
      </Link>

      {data && data.length === 0 ? (
        "No data"
      ) : (
        <FlightFormUpdate flight={data} authToken={session.accessToken} />
      )}
    </>
  );
};

export default page;
