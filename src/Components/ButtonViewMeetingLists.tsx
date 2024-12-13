import { Button as BaseButton } from "@mui/base/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AuthaxiosInstance from "../axios/BaseService";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  timezone: string;
  participants: number[];
}

interface UpdateFields {
  title?: string;
  date?: string;
  time?: string;
  duration?: number;
}

export default function ButtonViewMeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editingMeeting, setEditingMeeting] = useState<number | null>(null);
  const [updatedFields, setUpdatedFields] = useState<UpdateFields>({});
  const [refresh, setRefresh] = useState<number>(0);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const fetchMeetings = async (): Promise<void> => {
    try {
      const response = await AuthaxiosInstance.get<{ data: Meeting[] }>(
        "/meetings"
      );
      setMeetings(response.data.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await AuthaxiosInstance.delete(`/meetings/${id}`);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  const handleUpdate = async (): Promise<void> => {
    if (editingMeeting === null) return;
    try {
      await AuthaxiosInstance.put<{ data: Meeting }>(
        `/meetings/${editingMeeting}`,
        updatedFields
      );
      setRefresh((prev) => prev + 1);
      setEditingMeeting(null);
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };

  const handleEditToggle = (id: number): void => {
    setEditingMeeting(id === editingMeeting ? null : id);
  };

  useEffect(() => {
    fetchMeetings();
  }, [refresh]);

  const handleDateChange = (newValue: Dayjs | null, id: number): void => {
    if (newValue) {
      const formattedDate = newValue.format("YYYY-MM-DD");
      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === id ? { ...meeting, date: formattedDate } : meeting
        )
      );
      setUpdatedFields((prev) => ({ ...prev, date: formattedDate }));
    }
  };

  const handleTimeChange = (newValue: Dayjs | null, id: number): void => {
    if (newValue) {
      const formattedTime = newValue.format("HH:mm");
      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === id ? { ...meeting, time: formattedTime } : meeting
        )
      );
      setUpdatedFields((prev) => ({ ...prev, time: formattedTime }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} direction="row">
        <Button className="w-full h-[70px]" onClick={handleOpen}>
          View Meeting List
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#2A2A3B",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: "50%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h2 className="text-xl font-bold mb-4">Meeting List</h2>
            <Stack spacing={2}>
              {meetings.map((meeting) => (
                <Card key={meeting.id}>
                  {editingMeeting === meeting.id ? (
                    <div>
                      <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        defaultValue={meeting.title}
                        onChange={(e) =>
                          setUpdatedFields((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        sx={{ mb: 2 }}
                      />
                      <DatePicker
                        label="Date"
                        value={dayjs(meeting.date)}
                        onChange={(newValue) =>
                          handleDateChange(newValue, meeting.id)
                        }
                        sx={{ mb: 2 }}
                      />
                      <TimePicker
                        label="Time"
                        value={dayjs(meeting.time, "HH:mm")}
                        onChange={(newValue) =>
                          handleTimeChange(newValue, meeting.id)
                        }
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Duration (minutes)"
                        type="number"
                        variant="outlined"
                        defaultValue={meeting.duration}
                        onChange={(e) =>
                          setUpdatedFields((prev) => ({
                            ...prev,
                            duration: parseInt(e.target.value, 10),
                          }))
                        }
                        sx={{ mb: 2 }}
                      />
                      <Stack direction="row" spacing={1}>
                        <Button onClick={handleUpdate} small>
                          Save
                        </Button>
                        <Button
                          onClick={() => handleEditToggle(meeting.id)}
                          small
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-2">
                        {meeting.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-2">
                        Date: {meeting.date}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        Time: {dayjs(meeting.time, "HH:mm").format("hh:mm A")}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        Duration: {meeting.duration} minutes
                      </p>
                      <p className="text-sm text-gray-500">
                        Participants: {meeting.participants.join(", ")}
                      </p>
                      <Stack direction="row" spacing={1} mt={2}>
                        <Button
                          onClick={() => handleEditToggle(meeting.id)}
                          small
                        >
                          Edit
                        </Button>
                        <Button onClick={() => handleDelete(meeting.id)} small>
                          Delete
                        </Button>
                      </Stack>
                    </>
                  )}
                </Card>
              ))}
            </Stack>
          </Box>
        </Modal>
      </Stack>
    </LocalizationProvider>
  );
}

// Styles
const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.5;
  background-color: ${grey[500]};
  padding: 4px 8px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${grey[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${grey[400]}, inset 0 -2px 1px ${grey[600]};

  &:hover {
    background-color: ${grey[600]};
  }

  &:active {
    background-color: ${grey[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? grey[300] : grey[200]
    };
    outline: none;
  }

  &.base--disabled {
    background-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
`
);

const Card = styled(Box)(
  () => `
  background-color: #3B3B4F;
  color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`
);
