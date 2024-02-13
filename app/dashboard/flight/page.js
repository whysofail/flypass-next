'use client'
import { useSession } from "next-auth/react"
import FlightTable from "../../../Components/(Dashboard)/Flight/FlightTable"
import useDataFetching from "../../../Hooks/useDataFetching"

const Flight= () => {
    const {data: session} = useSession()
    const authToken = session?.accessToken || null;
    const url = 'http://localhost:5000/v1/flights'
  const { data, isLoading, error } = useDataFetching(
    url,
    authToken && status === "authenticated" ? authToken : null,
  );

  return (
    <>
        <FlightTable flights={data?.flights}/>
    </>
  )
}

export default Flight