"use client";
import React, { useEffect, useState } from "react";
import FlightForm from "../../../../../Components/(Dashboard)/Flight/FlightForm";
import useDataFetching from "../../../../../Hooks/useDataFetching";
import { useSession } from "next-auth/react";
import Link from "next/link";
const page = ({ params }) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const url = `http://localhost:5000/v1/flights/${params.id}`;
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });

          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [session]);
  return (
    <>
      <Link href="/dashboard/flight" className="btn mb-2">
        Back
      </Link>
      {data && data.length === 0 ? 'No data' : <FlightForm flight={data} authToken={session.accessToken} />}
    </>
  );
};

export default page;
