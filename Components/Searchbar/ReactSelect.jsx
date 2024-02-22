"use client";
import React from "react";
import dynamic from "next/dynamic";
const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });
import Select from "react-select";

import MenuList from "./MenuList";
import Option from "./Option";
import "./ReactSelect.scss";

const ReactSelect = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      defaultValue={defaultValue}
      loadOptions={options}
      value={value && [value]}
      onChange={onChange}
      className={`w-full ${className}`}
      classNamePrefix="react-select"
      placeholder={placeholder}
      components={{
        MenuList,
        Option,
      }}
    />
  );
};

export default ReactSelect;
