"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Steps from "../../Components/Steps/Steps";
import FlightList from "../../Components/Flight/FlightList";
import BookingForm from "../../Components/Booking/BookingForm";
import Payment from "../../Components/Payment/Payment";
import { useSession } from "next-auth/react";
import axios from "axios";

const Flight = () => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const depDate = searchParams.get("depDate");
  const arrDate = searchParams.get("arrDate");
  const from = searchParams.get("depAirport");
  const to = searchParams.get("arrAirport");

  const [depFlight, setDepFlight] = useState([]);
  const [selectedDepFlight, setSelectedDepFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [step, setStep] = useState(1);

  const stepItems = [
    {
      name: "Select Departure Flight",
    },
    ...(arrDate.length === 0
      ? [
          {
            name: "Fill In Information",
          },
        ]
      : [
          {
            name: "Select Return Flight",
          },
          {
            name: "Fill In Information",
          },
        ]),
    {
      name: "Payment",
    },
  ];

  useEffect(() => {
    // Fetch all necessary flight information when the page loads

    const fetchFlights = async () => {
      try {
        // Fetch outbound flights
        const response = await fetch(
          `http://localhost:5000/v1/flights/search?depDate=${depDate}&depAirport=${from}&arrAirport=${to}`,
        );
        const data = await response.json();
        if (data && data.flights) {
          setDepFlight(data.flights);
        }

        // Fetch return flights
        if (arrDate.length !== 0) {
          const response = await fetch(
            `http://localhost:5000/v1/flights/search?depDate=${arrDate}&depAirport=${to}&arrAirport=${from}`,
          );
          const data = await response.json();

          if (data && data.flights) {
            setReturnFlight(data.flights);
          }
        }
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []); // Run this effect only once when the component mounts

  const handleSetFlight = (selectedFlight) => {
    switch (step) {
      case 1:
        setSelectedDepFlight(selectedFlight);
        setStep(step + 1);
        break;
      case 2:
        if (arrDate.length === 0) {
          // Skip "Select Return Flight" if arrDate is empty
          setStep(step + 1);
        } else {
          setSelectedReturnFlight(selectedFlight);
          // If arrDate is present and selectedReturnFlight is selected, proceed to step 3
          if (arrDate.length !== 0 && selectedReturnFlight) {
            setStep(step + 1);
          } else {
            // Otherwise, proceed to step 2 (fill in information for return flight)
            setStep(step + 1);
          }
        }
        break;
      default:
    }
  };

  const handleFormSubmit = async (formData, passenger) => {
    try {
      // Check if session exists and access token is not null
      if (!session || !session.accessToken) {
        throw new Error("Access token is missing");
      }

      const response = await axios.post(
        "http://localhost:5000/v1/flights/books",
        {
          contactTitle: formData.title,
          contactFirstName: formData.firstName,
          contactLastName: formData.lastName,
          contactPhone: formData.phone,
          contactEmail: formData.email,
          flight1Id: selectedDepFlight?.id,
          flight2Id: selectedReturnFlight?.id,
          passenger,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      );

      if (!response.status === 200) {
        throw new Error("Failed to book flight");
      }

      setStep(step + 1);
      const data = await response.data;
      setBookingData(data);
      console.log("Booking successful:", data);

      // Perform any additional logic based on the response if needed
    } catch (error) {
      console.error("Error booking flight:", error.message);
      // Handle error as needed
    }
  };

  return (
    <main className="flex min-h-screen flex-col md:px-96 px-12 py-12 ">
      <div className="font-bold text-2xl">Search results</div>
      {console.log(session)}
      {console.log(selectedDepFlight, selectedReturnFlight)}
      {`${depDate}, ${from}, ${to}, `}
      {`dep: ${selectedDepFlight?.flightCode} `}
      {`arr: ${selectedReturnFlight?.flightCode}`}

      <div className="w-full">
        <Steps item={stepItems} currentStep={step} />
      </div>
      <div className="pt-4">
        {step === 1 && (
          <FlightList flights={depFlight} onSetFlight={handleSetFlight} />
        )}
        {step === 2 && arrDate.length === 0 && (
          <BookingForm onBookFlight={handleFormSubmit}>
            <FlightList flights={[selectedDepFlight]} useCard />
          </BookingForm>
        )}
        {step === 2 && arrDate.length !== 0 && (
          <FlightList flights={returnFlight} onSetFlight={handleSetFlight} />
        )}
        {step === 3 && arrDate.length === 0 && (
          <Payment
            bookingData={bookingData}
            selectedDepFlight={selectedDepFlight}
            selectedReturnFlight={selectedReturnFlight}
          />
        )}
        {step === 3 && arrDate.length !== 0 && (
          <BookingForm onBookFlight={handleFormSubmit}>
            <FlightList
              flights={[selectedDepFlight, selectedReturnFlight]}
              useCard
            />
          </BookingForm>
        )}
        {step === 4 && arrDate.length !== 0 && (
          <Payment
            bookingData={bookingData}
            selectedDepFlight={selectedDepFlight}
            selectedReturnFlight={selectedReturnFlight}
          />
        )}
      </div>
    </main>
  );
};

export default Flight;
