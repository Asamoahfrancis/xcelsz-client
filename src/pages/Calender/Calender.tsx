import { Calendar, List, Card } from "antd";

const MeetingDisplay = ({ meetings }: { meetings: any }) => {
  const renderListView = () => (
    <List
      dataSource={meetings}
      renderItem={(item: any) => (
        <List.Item>
          <Card title={item.title}>
            <p>{`Date: ${item.date}`}</p>
            <p>{`Time: ${item.time}`}</p>
            <p>{`Participants: ${item.participants}`}</p>
          </Card>
        </List.Item>
      )}
    />
  );

  const renderCalendarView = () => (
    <Calendar
      dateCellRender={(date) => {
        const dayMeetings = meetings.filter(
          (m: any) => m.date === date.format("YYYY-MM-DD")
        );
        return dayMeetings.map((m: any, idx: any) => (
          <div
            key={idx}
            style={{
              background: "#1890ff",
              color: "white",
              padding: 4,
              margin: 2,
            }}
          >
            {m.title}
          </div>
        ));
      }}
    />
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Scheduled Meetings</h2>
      {renderCalendarView()}
      {renderListView()}
    </div>
  );
};

export default MeetingDisplay;
