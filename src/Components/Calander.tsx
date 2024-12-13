import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import AuthaxiosInstance from "../axios/BaseService";
import { useEffect, useState } from "react";

interface Meeting {
  id: number;
  title: string;
  date: string; // e.g., "2024-12-15"
  time: string;
  duration: number;
  timezone: string;
  participants: number[];
}

const initialValue = dayjs();

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🗓️" : undefined}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#007FFF",
          color: "#FFF",
        },
      }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{
          backgroundColor: isSelected ? "#2A2A3B" : "transparent",
          color: outsideCurrentMonth ? "#6B7A90" : "#FFF",
          "&:hover": {
            backgroundColor: "#3A3A4B",
          },
          "&.Mui-selected": {
            backgroundColor: "#007FFF",
            color: "#FFF",
          },
        }}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  const fetchMeetings = async (month: number, year: number): Promise<void> => {
    try {
      const response = await AuthaxiosInstance.get<{ data: Meeting[] }>(
        "/meetings"
      );
      const fetchedMeetings = response.data.data;
      const currentMonthMeetings = fetchedMeetings
        .filter((meeting) => {
          const meetingDate = dayjs(meeting.date);
          return meetingDate.month() === month && meetingDate.year() === year;
        })
        .map((meeting) => dayjs(meeting.date).date());

      setHighlightedDays(currentMonthMeetings);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const currentDate = dayjs();
    fetchMeetings(currentDate.month(), currentDate.year());
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchMeetings(date.month(), date.year());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
        sx={{
          backgroundColor: "#1E1E2F",
          color: "#B3B3B3",
          "& .MuiPickersDay-root": {
            color: "#FFF",
          },
          borderRadius: {
            borderRadius: "10px",
          },
          "& .MuiPickersDay-root:hover": {
            backgroundColor: "#3A3A4B",
          },
          "& .MuiTypography-caption ": {
            color: "#D0D0D0",
          },
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#007FFF",
            color: "#FFF",
          },
          "& .MuiDayCalendar-weekContainer": {
            color: "#fff",
          },
          "& .MuiIconButton-root": {
            color: "#B3B3B3",
            "&:hover": {
              backgroundColor: "#2A2A3B",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
