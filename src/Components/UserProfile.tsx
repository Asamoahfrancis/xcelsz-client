const UserProfile = ({ user }: { user: any }) => {
  return (
    <>
      <section className="border border-[#4A4A5E] p-4 rounded-lg hover:bg-[#1E1E2F] cursor-pointer">
        <div className="flex items-center mb-4">
          <img
            src={
              `https://xcelsz-backend.onrender.com/${user.img}` ||
              "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-20 h-20 border rounded-full mr-4 object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-sm text-gray-400">Timezone: {user.timezone}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2 text-white">
            Available Times:
          </h3>
          <ul className="list-disc flex gap-8 pl-6 text-gray-300">
            {user.availableTimes &&
              Object.keys(user.availableTimes).map((date) => (
                <li key={date}>
                  <span className="font-medium">{date}:</span>{" "}
                  {user.availableTimes[date].join(" - ")}
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
