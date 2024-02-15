"use client";
import React from "react";
import FlightForm from "../../../../../Components/(Dashboard)/Flight/FlightForm";
import useDataFetching from "../../../../../Hooks/useDataFetching";
import { useSession } from "next-auth/react";
import Link from "next/link";
const page = ({ params }) => {
  const { data: session, status } = useSession();
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
      {!isLoading && data && <FlightForm flight={data} />}
    </>
  );
};

export default page;
