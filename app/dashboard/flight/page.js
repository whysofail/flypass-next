"use client";
import { useSession } from "next-auth/react";
import FlightTable from "../../../Components/(Dashboard)/Flight/FlightTable";
import useDataFetching from "../../../Hooks/useDataFetching";
import { useEffect, useState } from "react";
import Link from "next/link";

const Flight = () => {
  const { data: session } = useSession();
  const [data, setData] = [];
  const authToken = session?.accessToken || null;
  const url = "http://localhost:5000/v1/flights";
  useEffect(() => {
    const { data: flights } = useDataFetching(url, authToken);
  });

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-end">
        <Link href="/flight/create" className="btn mb-2 justify-end">
          Create
        </Link>
      </div>

      <FlightTable flights={data?.flights} />
    </div>
  );
};

export default Flight;
