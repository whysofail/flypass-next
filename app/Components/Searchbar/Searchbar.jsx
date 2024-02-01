"use client";
import React, { useState, useEffect } from "react";
import { FixedSizeList } from "react-window";
import dynamic from "next/dynamic";
const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

const CustomDropdown = ({ options, selectProps, innerRef }) => {
  const { menuIsOpen, inputValue } = selectProps;

  // Filter options based on input value
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div
      ref={innerRef}
      style={{
        display: menuIsOpen ? "block" : "none",
        position: "absolute",
        zIndex: 2,
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        background: "white",
        color: "black",
      }}
    >
      {/* Render the filtered options using react-window */}
      <FixedSizeList
        height={150}
        itemCount={filteredOptions.length}
        itemSize={35}
        width={100}
      >
        {({ index, style }) => (
          <div style={style}>{filteredOptions[index]}</div>
        )}
      </FixedSizeList>
    </div>
  );
};

const Searchbar = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Fetch options data from the API when the component mounts
    const fetchOptions = async () => {
      try {
        const url = "http://localhost:5000/v1/airport";
        const response = await fetch(url);
        const data = await response.json();
        setOptions(data.airport);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const loadOptions = (inputValue, callback) => {
    // Simulate an asynchronous response
    setTimeout(() => {
      const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()),
      );

      const transformedOptions = filteredOptions.map((option) => ({
        value: option.id,
        label: `${option.name} (${option.iata}) - ${option.city}, ${option.country}`,
      }));

      callback(transformedOptions);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row bg-slate-50 rounded-3xl shadow-xl py-4 px-8 border md:justify-evenly">
      <div className="md:mr-4 mb-4 md:mb-0  grow">
        <label htmlFor="from" className="block text-md font-medium text-black">
          From
        </label>
        <AsyncSelect
          loadOptions={loadOptions}
          components={{
            Dropdown: (props) => (
              <CustomDropdown
                options={options}
                selectProps={props.selectProps}
                innerRef={props.innerProps.ref}
              />
            ),
          }}
          placeholder="Select an airport..."
        />
      </div>
    </div>
  );
};

export default Searchbar;
