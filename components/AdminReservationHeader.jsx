import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const AdminReservationHeader = ({}) => {
  const router = useRouter();
  // Fetch data from http://localhost:8080/get_room_count
  const [roomCount, setRoomCount] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`${process.env.BACKEND_URL}/get_room_count`);
      setRoomCount(data.data);
    }
    fetchData();

    return () => {};
  }, []);
  if (roomCount === []) {
    return null;
  } else {
    console.log(roomCount);
    return (
      <div className="flex space-x-4">
        <button
          className="bg-green-500 p-3 rounded-md text-white"
          onClick={() => {
            router.push("/admin/reservation");
          }}
        >
          <span className="border p-1 rounded-lg bg-white text-green-300">
            {roomCount.pending}
          </span>{" "}
          Pendings
        </button>
        <button
          className="bg-blue-500 p-3 rounded-md text-white"
          onClick={() => {
            router.push("/admin/reservation/checkin");
          }}
        >
          <span className="border p-1 rounded-lg bg-white text-blue-300">
            {roomCount.check_in}
          </span>{" "}
          Check In
        </button>
        <button
          className="bg-yellow-500 p-3 rounded-md text-white"
          onClick={() => {
            router.push("/admin/reservation/checkout");
          }}
        >
          <span className="border p-1 rounded-lg bg-white text-yellow-300">
            {roomCount.check_out}
          </span>{" "}
          Check Out
        </button>
      </div>
    );
  }
};

export default AdminReservationHeader;
