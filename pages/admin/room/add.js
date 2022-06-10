import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
const AdminHeader = dynamic(() => import("../../../components/AdminHeader"), {
  ssr: false,
});
function AddRoom({ room }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // at init only
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);

  console.log(router.pathname);
  // console.log(room);
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
          AddRoom
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
              onChange={(e) => {
                setRoomType(e.target.value);
              }}
              value={roomType}
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
            <input
              type="file"
              name="image"
              id="image"
              className="bg-white border w-[300px] outline-none  focus:border-cyan-400 transition-all border-gray-300 rounded-md p-2 focus:shadow-md focus:shadow-blue-30"
              accept="image/*"
            ></input>
          </div>
          <button
            className="bg-green-600 hover:bg-green-300 transition-all hover:text-gray-600 text-white p-2 rounded-md"
            onClick={async () => {
              const res = await axios.post(
                `${process.env.BACKEND_URL}/add_room`,
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
            Add
          </button>
        </div>
      </div>
    </>
  ) : null;
}

export default AddRoom;
