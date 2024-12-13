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
  onMeetingTitle,
}: {
  onMeetingTitle: any;
}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const validateInput = (inputValue: string) => {
    if (!inputValue.trim()) {
      return "Meeting title cannot be empty";
    }
    if (inputValue.length > 50) {
      return "Meeting title must be less than 50 characters";
    }
    return "";
  };

  const handleChange = (event: { target: { value: any } }) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const validationError = validateInput(inputValue);
    setError(validationError);

    if (!validationError) {
      onMeetingTitle(inputValue);
    } else {
      onMeetingTitle("");
    }
  };

  return (
    <div>
      <Input
        aria-label="Demo input"
        placeholder="Enter meeting title"
        value={value}
        onChange={handleChange}
      />
      {error && <div style={{ color: "red", marginTop: "4px" }}>{error}</div>}
    </div>
  );
}

const darkModeColors = {
  text: "#E0E0E0",
  background: "#2A2A3B",
  border: "#4A4A5E",
  hoverBorder: "#B3B3B3",
};

const InputElement = styled("input")(
  () => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  width: 100%; /* Full width */
  height: 60px; /* Height set to 80px */
  color: ${darkModeColors.text};
  background-color: ${darkModeColors.background};
  border: 1px solid ${darkModeColors.border};

  &:hover {
    border-color: ${darkModeColors.hoverBorder};
  }

 
  /* firefox */
  &:focus-visible {
    outline: 0;
  }
`
);
