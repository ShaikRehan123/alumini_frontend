import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
const AdminHeader = dynamic(() => import("../../../components/AdminHeader"), {
  ssr: false,
});
function Reservation({ transaction }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [roomNo, setRoomNo] = useState(0);
  const [noOfDays, setNoOfDays] = useState(0);
  const [extraBed, setExtraBed] = useState(0);
  useEffect(() => setMounted(true), []); // at init only
  console.log(router.pathname);
  // console.log(pending_rooms);
  console.log(transaction);
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
            bg-blue-600 text-white p-2 rounded-md
        `}
          onClick={() => {
            router.push("/admin/reservation");
          }}
        >
          Reservation
        </span>
        <span
          className={`text-cyan-500`}
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
      <div className="border border-gray-300 rounded-md w-[95%] m-auto p-5">
        <div className="bg-cyan-200 bg-opacity-75 w-full h-14 flex items-center p-3">
          <h1 className="text-blue-300">Fill Up Form</h1>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full cursor-not-allowed p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all focus:shadow-md"
              value={transaction.name}
              disabled={true}
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="room_type">Room Type</label>
            <input
              type="text"
              name="room_type"
              id="room_type"
              className="w-full cursor-not-allowed p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all focus:shadow-md"
              value={transaction.room_type}
              disabled={true}
            />
          </div>
          <div className="flex space-x-4">
            <div className="space-y-1">
              <label htmlFor="number">Room No</label>
              <input
                type="number"
                name="room_no"
                id="room_no"
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all focus:shadow-md"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="number">No Of Days</label>
              <input
                type="number"
                name="no_of_days"
                id="no_of_days"
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all focus:shadow-md"
                value={noOfDays}
                onChange={(e) => setNoOfDays(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="number">Extra Bed</label>
              <input
                type="number"
                name="extra_bed"
                id="extra_bed"
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all focus:shadow-md"
                value={extraBed}
                onChange={(e) => setExtraBed(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            className="bg-yellow-500 mt-4 transition-all hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={async () => {
              const data = await axios.post(
                `${process.env.BACKEND_URL}/confirm_checkin`,
                {
                  room_no: roomNo,
                  no_of_days: noOfDays,
                  extra_bed: extraBed,
                  transaction_id: transaction.transaction_id,
                }
              );

              if (data.data.error) {
                toast.error(data.data.error.sqlMessage);
              }

              if (data.data.message == "Room is already occupied") {
                toast.error(data.data.message);
                return;
              }
              if (data.data.message == "Successfully Checked In") {
                toast.success(data.data.message);
                router.push("/admin/reservation");
              }
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  ) : null;
}

export default Reservation;

export async function getServerSideProps({ query }) {
  const transaction_id = query.t_id;
  console.log(transaction_id);
  const data = await axios.get(
    `${process.env.BACKEND_URL}/get_transaction_by_id?transaction_id=${transaction_id}`
  );
  return {
    props: {
      transaction: data.data.data[0],
    },
  };
}
