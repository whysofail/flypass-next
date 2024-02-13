import React from "react";

const PassengerForm = ({ passengers, onPassengerUpdate }) => {
  const addPassenger = () => {
    onPassengerUpdate([
      ...passengers,
      {
        firstName: "",
        lastName: "",
        identityType: "ktp",
        identityNumber: "",
        baggage: [15], // Set default value as an array
      },
    ]);
  };

  const handlePassengerChange = (index, key, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][key] = value;
    onPassengerUpdate(updatedPassengers);
  };

  const removePassenger = (index) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    onPassengerUpdate(updatedPassengers);
  };
  
  return (
    <div className="card py-4">
      <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>
      {passengers.map((passenger, index) => (
        <div key={index} className="mb-4">
          <div className="flex gap-4">
            <div className="">
              <label className="block mb-1 text-sm font-medium">
                First Name:
              </label>
              <input
                type="text"
                value={passenger.firstName}
                onChange={(e) =>
                  handlePassengerChange(index, "firstName", e.target.value)
                }
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="">
              <label className="block mb-1 text-sm font-medium">
                Last Name:
              </label>
              <input
                type="text"
                value={passenger.lastName}
                onChange={(e) =>
                  handlePassengerChange(index, "lastName", e.target.value)
                }
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          <label className="block mt-2 mb-1 text-sm font-medium">
            Identity Type
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            id="id_type"
            name="identityType"
            value={passenger.identityType}
            onChange={(e) =>
              handlePassengerChange(index, "identityType", e.target.value)
            }
          >
            <option value="ktp">KTP</option>
            <option value="passport">Passport</option>
          </select>

          <label className="block mb-1 text-sm font-medium">
            Identity Number
          </label>
          <input
            type="text"
            value={passenger.identityNumber}
            onChange={(e) =>
              handlePassengerChange(index, "identityNumber", e.target.value)
            }
            className="input input-bordered w-full max-w-xs"
          />

          <div>
            <button
              onClick={() => removePassenger(index)}
              className="mt-2 p-2 bg-red-500 text-white rounded-md"
            >
              Remove Passenger
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addPassenger}
        className="p-2 bg-green-500 text-white rounded-md max-w-xs"
      >
        Add Passenger
      </button>
    </div>
  );
};

export default PassengerForm;
