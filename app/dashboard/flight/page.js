"use client";
import { useSession } from "next-auth/react";
import FlightTable from "../../../Components/(Dashboard)/Flight/FlightTable";
import { fetchData } from "../../../Helper/fetch";
import { useEffect, useState } from "react";
import Link from "next/link";

const Flight = () => {
  const url = "http://localhost:5000/v1/flights";

  const { data: session } = useSession();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        if (session) {
          const data = await fetchData(url, "GET", null, session.accessToken);
          console.log(data);
          setData(data.flights);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [session]);

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-end">
        <Link href="flight/create" className="btn mb-2 justify-end">
          Create
        </Link>
      </div>
      {data === 0 ? (
        "No Data"
      ) : (
        <FlightTable flights={data} authToken={session.accessToken} />
      )}
    </div>
  );
};

export default Flight;
