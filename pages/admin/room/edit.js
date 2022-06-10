import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
const AdminHeader = dynamic(() => import("../../../components/AdminHeader"), {
  ssr: false,
});
function Reservation({ room }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // at init only
  const [roomType, setRoomType] = useState(room.room_type);
  const [roomPrice, setRoomPrice] = useState(room.price);

  console.log(router.pathname);
  console.log(room);
  return mounted ? (
    <>
      <AdminHeader />
      <div className="flex p-5 space-x-3 items-center">
        <span className={`text-cyan-500`}>Home</span>
        <span
          className={`${"text-cyan-500 "}`}
          onClick={() => {
            router.push("/admin/accounts");
          }}
        >
          Account
        </span>
        <span
          className={`
          text-cyan-500
        `}
          onClick={() => {
            router.push("/admin/reservation");
          }}
        >
          Reservation
        </span>
        <span
          className={`
                      bg-blue-600 text-white p-2 rounded-md

          `}
          onClick={() => {
            router.push("/admin/room");
          }}
        >
          Room{" "}
        </span>
        <span
          className={`text-cyan-500`}
          onClick={() => {
            router.push("/admin/user");
          }}
        >
          Users
        </span>
      </div>
      <div className="border space-y-6 border-gray-300 rounded-md w-[95%] m-auto p-5">
        <div className="bg-cyan-200 bg-opacity-75 w-full h-14 flex items-center p-3">
          <h1 className="text-blue-300">Transaction / Room / Change Room</h1>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor="room_type">Room Type</label>
            <select
              name="room_type"
              id="room_type"
              className="bg-white border w-[300px] outline-none  focus:border-cyan-400 transition-all border-gray-300 rounded-md p-2 focus:shadow-md focus:shadow-blue-30"
              defaultValue={
                // convert to snake case
                room.room_type.split(" ").join("_").toLowerCase()
              }
              onChange={(e) => {
                setRoomType(e.target.value);
              }}
            >
              <option value="" defaultChecked={true} disabled>
                Select Room Type
              </option>
              <option value="standard">Standard</option>
              <option value="superior">Superior</option>
              <option value="super_deluxe">Super Deluxe</option>
              <option value="js_suite">Jr. Suite</option>
              <option value="executive_suite">Executive Suite</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="room_type">Room Price</label>
            <input
              name="price"
              id="price"
              className="bg-white border w-[300px] outline-none  focus:border-cyan-400 transition-all border-gray-300 rounded-md p-2 focus:shadow-md focus:shadow-blue-30"
              type={`number`}
              value={roomPrice}
              onChange={(e) => {
                setRoomPrice(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col space-y-2">
            {/* Show Previos Photo */}
            <label htmlFor="image">Room Photo (Not Added)</label>
            <img
              src={`http://localhost/alumni/images/${room.photo}`}
              alt={`${room.photo}`}
              className="w-[300px] h-[auto]"
            />
            <input
              type="file"
              name="image"
              id="image"
              className="bg-white border w-[300px] outline-none  focus:border-cyan-400 transition-all border-gray-300 rounded-md p-2 focus:shadow-md focus:shadow-blue-30"
              accept="image/*"
            ></input>
          </div>
          <button
            className="bg-yellow-600 hover:bg-yellow-300 transition-all hover:text-gray-600 text-white p-2 rounded-md"
            onClick={async () => {
              const res = await axios.put(
                `${process.env.BACKEND_URL}/update_room?room_id=${room.room_id}`,
                {
                  room_type: roomType,
                  price: roomPrice,
                }
              );
              if (res.data.status === 200) {
                toast.success(res.data.message);
                // router.push("/admin/room");
                router.back();
              } else {
                toast.error(res.data.error.sqlMessage);
              }
            }}
          >
            Update
          </button>
        </div>
      </div>
    </>
  ) : null;
}

export default Reservation;

export async function getServerSideProps({ query }) {
  const room_id = query.room_id;
  console.log(room_id);
  const data = await axios.get(
    `${process.env.BACKEND_URL}/get_room_by_id?room_id=${room_id}`
  );
  return {
    props: {
      room: data.data.data[0],
    },
  };
}
