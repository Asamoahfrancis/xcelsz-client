import { TextField } from "@mui/material";
import { useState } from "react";

const CustomeDescription = ({ onDescription }: { onDescription: any }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateDescription = (inputValue: string) => {
    if (!inputValue.trim()) {
      return "Description cannot be empty";
    }
    if (inputValue.length > 200) {
      return "Description must be less than 200 characters";
    }
    return "";
  };

  const handleChange = (event: { target: { value: any } }) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const validationError = validateDescription(inputValue);
    setError(validationError);

    if (!validationError) {
      onDescription(inputValue);
    } else {
      onDescription("");
    }
  };

  return (
    <div>
      <TextField
        id="outlined-multiline-static"
        placeholder="Enter meeting description"
        multiline
        rows={4}
        value={value}
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error}
        sx={{
          width: "100%",
          backgroundColor: "#1E1E2F",
          color: "#B3B3B3",
          "& .MuiOutlinedInput-root": {
            color: "#B3B3B3",
            backgroundColor: "#2A2A3B",
            "& fieldset": {
              borderColor: "#4A4A5E",
            },
            "&:hover fieldset": {
              borderColor: "#B3B3B3",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#007FFF",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#B3B3B3",
          },
        }}
      />
      {/* {error && <div style={{ color: "red", marginTop: "4px" }}>{error}</div>} */}
    </div>
  );
};

export default CustomeDescription;
