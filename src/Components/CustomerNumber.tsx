import * as React from "react";
import { Input as BaseInput, InputProps } from "@mui/base/Input";
import { styled } from "@mui/system";

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

export default function UnstyledInputBasic({
  onDuration,
}: {
  onDuration: (value: number | null) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value ? parseFloat(value) : null; // Parse to number or null
    onDuration(numericValue); // Pass the value to the parent callback
  };

  return (
    <Input
      aria-label="Demo input"
      placeholder="Enter a number"
      type="number"
      onChange={handleChange} // Attach the handler
    />
  );
}

const InputElement = styled("input")(
  () => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  width: 100%; /* Full width */
  height: 60px; /* Height set to 70px */
  color: #B3B3B3; /* Light text color */
  background-color: #2A2A3B; /* Input field background */
  border: 1px solid #4A4A5E; /* Default border color */

  &:hover {
    border-color: #B3B3B3; /* Hover border color */
  }

  &:focus {
    border-color: #007FFF; /* Focus border color */
    box-shadow: 0 0 0 3px rgba(0, 127, 255, 0.25); /* Focus shadow */
  }

  /* firefox */
  &:focus-visible {
    outline: 0;
  }
`
);
