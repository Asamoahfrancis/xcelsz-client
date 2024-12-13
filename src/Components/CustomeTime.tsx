import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment-timezone"; // Import moment-timezone for timezone calculations
import dayjs from "dayjs"; // Import dayjs

export default function BasicTimePicker({
  onSelectTime,
  value,
  selectedTimezone,
  dateFromChangeTimeZone,
}: {
  onSelectTime: (time: string) => void;
  value: string | null;
  selectedTimezone: string;
  dateFromChangeTimeZone: any;
}) {
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    if (value) {
      const parsedTime = moment(value).tz(selectedTimezone, true);
      // Convert the moment object to dayjs
      const dayjsTime = dayjs(parsedTime.toDate());
      // console.log("parsedTime : ", dayjsTime);
      dateFromChangeTimeZone(dayjsTime);
      setSelectedTime(dayjsTime);
    }
  }, [value, selectedTimezone]);

  const handleTimeChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedTime(newValue);
    if (newValue) {
      const formattedTime = newValue.format("HH:mm");
      onSelectTime(formattedTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          value={selectedTime} // Use selectedTime (Dayjs) as value
          onChange={handleTimeChange} // Handle time change
          sx={{
            width: "100%", // Full width
            backgroundColor: "#1E1E2F", // Dark background
            color: "#B3B3B3", // Light text color
            "& .MuiOutlinedInput-root": {
              color: "#B3B3B3", // Text color inside input
              backgroundColor: "#2A2A3B", // Input field background
              "& fieldset": {
                borderColor: "#4A4A5E", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#B3B3B3", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "#007FFF", // Focus border color
              },
            },
            "& .MuiInputLabel-root": {
              color: "#B3B3B3", // Label text color
            },
            "& .MuiSvgIcon-root": {
              color: "#B3B3B3", // Clock icon color
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
