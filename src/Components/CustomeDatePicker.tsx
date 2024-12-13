import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs"; // Import dayjs for date manipulation

export default function BasicDatePicker({
  onSelectDate,
  FromChangeTimeZone,
}: {
  onSelectDate: (date: Dayjs | null) => void;
  FromChangeTimeZone?: string; // Expected to be a timezone-adjusted date string
}) {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (FromChangeTimeZone) {
      const adjustedDate = dayjs(FromChangeTimeZone); // Parse the date string
      setSelectedDate(adjustedDate); // Set the initial date
    }
  }, [FromChangeTimeZone]); // Update only if FromChangeTimeZone changes

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date); // Update local state
    onSelectDate(date); // Pass the selected date to the parent
    console.log(
      "Selected Date:",
      date ? date.format("YYYY-MM-DD") : "No date selected"
    );
  };

  useEffect(() => {
    if (selectedDate) {
      onSelectDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={selectedDate} // Bind the state to the DatePicker
          views={["year", "month", "day"]} // Allows selecting year, month, and day
          onChange={handleDateChange} // Handle date changes
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
            "& .MuiSvgIcon-root": {
              color: "#B3B3B3", // Set the calendar icon color to gray
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
