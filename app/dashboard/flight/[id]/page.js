"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../Helper/fetch";
import FlightCard from "../../../../Components/Flight/FlightCard";
import useDataFetching from "../../../../Hooks/useDataFetching";
import { useSession } from "next-auth/react";
import Link from "next/link";
const page = ({ params }) => {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const url = `http://localhost:5000/v1/flights/${params.id}`;
  useEffect(() => {
    const fetch = async () => {
      if (session) {
        try {
          const data = await fetchData(url, "GET", null, session.accessToken);
          console.log(data);
          setData(data.flights);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetch();
  }, [session]);

  return (
    <>
      <Link href="/dashboard/flight" className="btn mb-2">
        Back
      </Link>
      {data.length === 0 ? "No Data Found" : <FlightCard flight={data} />}
    </>
  );
};

export default page;
