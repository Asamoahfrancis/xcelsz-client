import { useState } from "react";
import ScheduleMeetingForm from "../../ScheduleMeetingForm/ScheduleMeetingForm";
import MeetingDisplay from "../Calender/Calender";

const Scheduler = () => {
  const [meetings, setMeetings] = useState<any>([]);

  const handleAddMeeting = (meeting: any) => {
    setMeetings([
      ...meetings,
      { ...meeting, date: meeting.date.format("YYYY-MM-DD") },
    ]);
  };

  return (
    <div>
      <h1>Scheduling UI</h1>
      <ScheduleMeetingForm onSubmit={handleAddMeeting} />
      <MeetingDisplay meetings={meetings} />
    </div>
  );
};

export default Scheduler;
