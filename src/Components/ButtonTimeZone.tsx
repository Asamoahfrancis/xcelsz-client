import { Button as BaseButton } from "@mui/base/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ButtonViewMeetingList({
  onSelectZone,
}: {
  onSelectZone: (timezone: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("GMT");

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleTimezoneChange = (event: any) => {
    const newTimezone = event.target.value;
    setSelectedTimezone(newTimezone);
    onSelectZone(newTimezone);
  };

  const getTimeInTimezone = () => {
    const now = dayjs().tz(selectedTimezone);
    return now.format("YYYY-MM-DD hh:mm:ss A z");
  };

  useEffect(() => {
    onSelectZone("GMT");
  }, []);

  return (
    <Stack spacing={2} direction="row">
      <Button onClick={handleOpen}>Change Time Zone</Button>
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
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <h2 className="text-xl font-bold mb-4">Time Zone</h2>
          <p className="text-sm text-gray-500 mb-4">
            Selected Timezone: {selectedTimezone}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Current Time: {getTimeInTimezone()}
          </p>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="timezone-select-label">Timezone</InputLabel>
            <Select
              labelId="timezone-select-label"
              value={selectedTimezone}
              label="Timezone"
              onChange={handleTimezoneChange}
              sx={{ color: "#fff" }}
            >
              <MenuItem value="GMT">GMT</MenuItem>
              <MenuItem value="UTC">UTC</MenuItem>
              <MenuItem value="America/New_York">EST</MenuItem>
              <MenuItem value="America/Los_Angeles">PST</MenuItem>
              <MenuItem value="Europe/Berlin">CET</MenuItem>
              <MenuItem value="Asia/Kolkata">IST</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </Stack>
  );
}

const red = {
  50: "#FFE5E5",
  100: "#FFCCCC",
  200: "#FF9999",
  300: "#FF6666",
  400: "#FF4D4D",
  500: "#FF3333",
  600: "#E62626",
  700: "#B81F1F",
  800: "#8A1717",
  900: "#5C0F0F",
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${red[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  width:100%;
  height:70px;
  border: 1px solid ${red[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${red[400]}, inset 0 -2px 1px ${red[600]};

  &:hover {
    background-color: ${red[600]};
  }

  &:active {
    background-color: ${red[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? red[300] : red[200]
    };
    outline: none;
  }

  &.base--disabled {
    background-color: ${theme.palette.mode === "dark" ? red[700] : red[200]};
    color: ${theme.palette.mode === "dark" ? red[200] : red[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
`
);
