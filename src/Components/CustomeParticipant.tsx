import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import AuthaxiosInstance from "../axios/BaseService";

const SelectElement = styled("select")(
  () => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  width: 100%; /* Full width */
  height: 60px; /* Height set to 60px */
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

export default function CustomeParticipant({
  onSelectParticipants,
}: {
  onSelectParticipants: (userId: number) => void;
}) {
  const [getUsers, setGetUsers] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await AuthaxiosInstance.get("/users");
        const payload = response.data;
        setGetUsers(payload);

        if (payload.length > 0) {
          onSelectParticipants(payload[0].id);
        }
      } catch (error) {
        console.error("Error occurred while fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  const handleChange = (event: any) => {
    onSelectParticipants(event.target.value);
  };

  if (loading) {
    return <p>Loading participants...</p>;
  }

  return (
    <SelectElement aria-label="Select Participant" onChange={handleChange}>
      {getUsers.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </SelectElement>
  );
}

const darkModeColors = {
  text: "#E0E0E0",
  background: "#2A2A3B",
  border: "#4A4A5E",
  hoverBorder: "#B3B3B3",
};
