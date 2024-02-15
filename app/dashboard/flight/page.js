"use client";
import { useSession } from "next-auth/react";
import FlightTable from "../../../Components/(Dashboard)/Flight/FlightTable";
import useDataFetching from "../../../Hooks/useDataFetching";
import { useEffect, useState } from "react";
import Link from "next/link";

const Flight = () => {
  const url = "http://localhost:5000/v1/flights";

  const { data: session } = useSession();
  const [data, setData] = useState([])
  useEffect(()=>{
    const fetchData = async () => {
      try {
        if(session){
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              Authorization : `Bearer ${session?.accessToken}`
            }
          })
          const data = await response.json()
          console.log(data)
          setData(data.flights)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [session])


  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-end">
        <Link href="/flight/create" className="btn mb-2 justify-end">
          Create
        </Link>
      </div>

      <FlightTable flights={data} />
    </div>
  );
};

export default Flight;
