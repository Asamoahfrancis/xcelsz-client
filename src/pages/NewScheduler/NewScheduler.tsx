import { useEffect, useState } from "react";
import ButtonViewMeetingList from "../../Components/ButtonTimeZone";
import ButtonViewTimezone from "../../Components/ButtonViewMeetingLists";
import DateCalendarServerRequest from "../../Components/Calander";
import UnstyledButtonsSimple from "../../Components/CustomButton";
import BasicDatePicker from "../../Components/CustomeDatePicker";
import CustomeDescription from "../../Components/CustomeDescription";
import CustomeParticipant from "../../Components/CustomeParticipant";
import CustomNumber from "../../Components/CustomerNumber";
import BasicTimePicker from "../../Components/CustomeTime";
import UnstyledInputBasic from "../../Components/CustomInput";
import UserProfile from "../../Components/UserProfile";
import dayjs from "dayjs";
import AuthaxiosInstance from "../../axios/BaseService";
import { Snackbar, Alert } from "@mui/material";

const NewScheduler = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("GMT");
  const [meetingTitleState, setMeetingTitleState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [participantsState, setParticipantsState] = useState<any>();
  const [meetingTimeState, setMeetingTimeState] = useState<any>("");
  const [durationValue, setDurationValue] = useState<any>();
  const [MainDate, setMainDate] = useState<any>("");
  const [FromChangeTimeZone, setdateFromChangeTimeZone] = useState<any>("");
  const [getUsers, setGetUsers] = useState<any>();
  const [GetAvailableSlots, setGetAvailableSlots] = useState<any>();
  const [alertState, setAlertState] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleClose = () => {
    setAlertState({ ...alertState, open: false });
  };

  const meetingTitle = (title: string) => {
    setMeetingTitleState(title);
  };

  const description = (desc: string) => {
    setDescriptionState(desc);
  };

  const selectParticipants = (userId: number) => {
    setParticipantsState(userId);
  };

  const selectTime = (time: string) => {
    const updatedTime = dayjs(time, "HH:mm").format("YYYY-MM-DD hh:mm:ss A");
    setMeetingTimeState(updatedTime);
  };

  const selectDate = (date: any) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setMainDate(formattedDate);
    } else {
      console.log("No date selected");
    }
  };

  const durationHandler = (dura: any) => {
    setDurationValue(dura);
  };

  const dateFromChangeTimeZone = (dateChangeTime: any) => {
    setdateFromChangeTimeZone(dateChangeTime);
  };

  const selectZone = (zone: string) => {
    setSelectedTimezone(zone);
  };

  const onclickHandler = async () => {
    try {
      const requestBody = {
        title: meetingTitleState.trim(),
        description: descriptionState.trim(),
        participants: [parseInt(participantsState, 10)],
        duration: durationValue,
        time: meetingTimeState,
        date: MainDate,
        timezone: selectedTimezone,
      };

      console.log("Request Body: ", requestBody);

      const response = await AuthaxiosInstance.post("/meetings", requestBody);
      console.log("Meeting Created Successfully: ", response.data);

      setAlertState({
        open: true,
        severity: "success",
        message: "Meeting created successfully!",
      });

      setMeetingTitleState("");
      setDescriptionState("");
      setParticipantsState(null);
      setMeetingTimeState("");
      setdateFromChangeTimeZone("");
      setSelectedTimezone("GMT");
    } catch (error) {
      console.error("Error creating meeting: ", error);

      setAlertState({
        open: true,
        severity: "error",
        message: "Failed to create the meeting. Please try again.",
      });
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await AuthaxiosInstance.get("/users");
        const payload = response.data;
        setGetUsers(payload);
      } catch (error) {
        setAlertState({
          open: true,
          severity: "error",
          message: "Failed to fetch all users.",
        });
      }
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    const getAvailableSlots = async () => {
      if (!getUsers || !participantsState) {
        console.error("Missing users or participant state");
        return;
      }

      console.log("ParticipantsState:", participantsState);
      console.log("All Users:", getUsers);

      const selectedUser = getUsers.find(
        (user: any) => user.id == participantsState
      );

      if (!selectedUser) {
        console.error("No matching user for ID:", participantsState);
        setGetAvailableSlots([]);
        return;
      }

      if (!selectedUser.availableTimes) {
        console.error("Selected User has no availableTimes:", selectedUser);
        setGetAvailableSlots([]);
        return;
      }

      try {
        const availableDateKey = Object.keys(selectedUser.availableTimes)
          .join("")
          .trim();
        console.log("Available Date Key: ", availableDateKey);

        const response = await AuthaxiosInstance.get(
          `/users/${participantsState}/available-slots?date=${availableDateKey}`
        );

        const { availableSlots } = response.data;
        console.log("Fetched Available Slots: ", availableSlots);
        setGetAvailableSlots(availableSlots);
      } catch (error) {
        console.error("Error fetching available slots: ", error);
        setAlertState({
          open: true,
          severity: "error",
          message: "Failed to fetch available slots.",
        });
      }
    };

    getAvailableSlots();
  }, [participantsState, getUsers]);

  return (
    <main className="relative bg-[#1E1E2F]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto py-10">
        {/* Left Sidebar */}
        <section className="hidden gap-4 lg:flex lg:flex-col lg:gap-4 bg-[#2A2A3B] p-4 rounded-lg">
          <section className="hidden gap-4 lg:flex lg:flex-col lg:gap-4 bg-[#2A2A3B] p-4 rounded-lg">
            {getUsers?.length > 0 ? (
              getUsers.map((user: any) => (
                <UserProfile key={user.id} user={user} />
              ))
            ) : (
              <p className="text-gray-400">No users available</p>
            )}
          </section>
        </section>

        {/* Main Content */}
        <section className="col-span-1 lg:col-span-2 bg-[#2A2A3B] p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="flex flex-col gap-2">
              <span className="text-[#B3B3B3]">Meeting Title</span>
              <UnstyledInputBasic onMeetingTitle={meetingTitle} />
            </section>
            <section className="flex flex-col gap-2">
              <span className="text-[#B3B3B3]">Enter Duration (minutes)</span>
              <CustomNumber onDuration={durationHandler} />
            </section>
            <section className="flex flex-col gap-2 md:col-span-2">
              <span className="text-[#B3B3B3]">Participants</span>
              <CustomeParticipant onSelectParticipants={selectParticipants} />
              <div>
                <div>
                  <span>Available Slots: </span>
                  {GetAvailableSlots?.length > 0
                    ? GetAvailableSlots.map((slot: string) => (
                        <span key={slot} className="inline-block mx-2">
                          {slot}
                        </span>
                      ))
                    : "No slots available"}
                </div>
              </div>
            </section>
            <section className="flex flex-col gap-2">
              <span className="text-[#B3B3B3]">Time</span>
              <BasicTimePicker
                value={meetingTimeState}
                onSelectTime={selectTime}
                selectedTimezone={selectedTimezone}
                dateFromChangeTimeZone={dateFromChangeTimeZone}
              />
            </section>
            <section className="flex flex-col gap-2">
              <span className="text-[#B3B3B3]">Date</span>
              <BasicDatePicker
                onSelectDate={selectDate}
                FromChangeTimeZone={FromChangeTimeZone}
              />
            </section>

            <section className="flex flex-col gap-2 md:col-span-2">
              <span className="text-[#B3B3B3]">Description</span>
              <CustomeDescription onDescription={description} />
              <UnstyledButtonsSimple onclick={onclickHandler} />
            </section>
          </div>
        </section>

        <section className="hidden lg:block bg-[#2A2A3B] p-4 rounded-lg">
          <DateCalendarServerRequest />
        </section>

        <section className="col-span-1 lg:col-span-2 bg-[#2A2A3B] p-6 rounded-lg text-white">
          <div className="text-sm  flex flex-col gap-4 text-gray-400">
            <ButtonViewTimezone />
            <ButtonViewMeetingList onSelectZone={selectZone} />
          </div>
        </section>
      </div>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertState.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default NewScheduler;
