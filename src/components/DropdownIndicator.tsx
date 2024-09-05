import React from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
import { ColourOption, colourOptions } from "../data";
import Image from "next/image";

export const DropdownIndicator = (
  props: DropdownIndicatorProps<ColourOption, true>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image
        src={"/images/arrow_down.png"}
        alt="Arrow Down"
        width={25}
        height={25}
        className="mr-3 cursor-pointer"
      />
    </components.DropdownIndicator>
  );
};
