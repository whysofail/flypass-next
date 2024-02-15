"use client";
import React from "react";
import FlightCard from "../../../../Components/Flight/FlightCard";
import useDataFetching from "../../../../Hooks/useDataFetching";
import { useSession } from "next-auth/react";
import Link from "next/link";
const page = ({ params }) => {
  const { data: session } = useSession();
  const url = `http://localhost:5000/v1/flights/${params.id}`;
  const authToken = session?.accessToken || null;

  const { data, isLoading, error } = useDataFetching(
    url,
    authToken && status === "authenticated" ? authToken : null,
  );

  return (
    <>
      <Link href="/dashboard/flight" className="btn mb-2">
        Back
      </Link>
      {!isLoading && data && <FlightCard flight={data} />}
    </>
  );
};

export default page;
