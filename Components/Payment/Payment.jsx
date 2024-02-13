import React from "react";
import FlightCard from "../Flight/FlightCard";
import { useRouter } from "next/navigation";

const Payment = ({ bookingData, selectedDepFlight, selectedReturnFlight }) => {
  const router = useRouter();
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(bookingData?.booking?.totalPrice);

  const handleSubmitPayment = async () => {
    try {
      const fileInput = document.getElementById("fileInput");
      const file = fileInput?.files[0];

      if (!file) {
        alert("Please upload an image for verification.");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      // Simulating sending the image to the server
      const response = await fetch(
        `http://localhost:5000/v1/pay/create/${bookingData?.booking?.id}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        console.log("Payment submitted successfully!");
        console.log(response);
        router.push("/");
      } else {
        console.error("Failed to submit payment.");
      }
    } catch (error) {
      console.error("Error submitting payment:", error.message);
    }
  };

  return (
    <div className="flex gap-8">
      {/* Left side: Card containing Payment and Booking Info */}
      <div className="flex card flex-col grow p-4 border border-slate-300 bg-base-100 shadow-xl h-fit">
        <h1 className="font-bold text-lg">Complete payment for your booking</h1>

        <p>Booking Code: {bookingData?.booking?.bookingCode}</p>
        <p>Total Price: {formattedPrice}</p>

        {/* Upload and Buttons */}
        <div className="flex flex-col gap-2">
          <label htmlFor="file">Upload an Image</label>
          <input
            id="fileInput"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex gap-12 py-4">
          <button className="btn">Later</button>
          <button className="btn" onClick={handleSubmitPayment}>
            Pay Now
          </button>
        </div>
      </div>

      {/* Right side: Flight Info */}
      <div className="flex flex-col gap-2">
        <FlightCard flight={selectedDepFlight} />

        {selectedReturnFlight ? (
          <FlightCard flight={selectedReturnFlight} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Payment;
