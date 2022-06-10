import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import AdminReservationHeader from "../../../components/AdminReservationHeader";
const AdminHeader = dynamic(() => import("../../../components/AdminHeader"), {
  ssr: false,
});
function Reservation({ pending_rooms, no_of_pending_rooms }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // at init only
  console.log(router.pathname);
  console.log(pending_rooms);
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
      <div className="border border-gray-300 rounded-md w-[95%] m-auto p-5 space-y-6">
        <AdminReservationHeader no_of_pending_rooms={no_of_pending_rooms} />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact No
                </th>
                <th scope="col" className="px-6 py-3">
                  Room Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Arrival From
                </th>
                <th scope="col" className="px-6 py-3">
                  Purpose of Visit
                </th>
                <th scope="col" className="px-6 py-3">
                  Reserved Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pending_rooms.map((room) => (
                <tr
                  key={room.room_id}
                  className="border-b   odd:bg-white even:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {room.name}
                  </th>
                  <td className="px-6 py-4">{room.mobile}</td>
                  <td className="px-6 py-4">{room.room_type}</td>
                  <td className="px-6 py-4">{room.a_from}</td>
                  <td className="px-6 py-4">{room.a_visit}</td>
                  <td className="px-6 py-4 text-green-500">
                    {/* Create date like jan 24, 2022*/}
                    {
                      // Format it like this "Jun 24, 2020"
                      new Date(room.checkin).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                  </td>
                  <td className="px-6 py-4 ">{room.status}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      className="bg-green-500 shadow-lg hover:bg-green-700 transition-all text-white font-bold py-2 px-4 rounded-md border border-gray-300"
                      onClick={() => {
                        router.push(
                          `/admin/reservation/confirm_checkin?t_id=${room.transaction_id}`
                        );
                      }}
                    >
                      Check In
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 shadow-lg transition-all text-white font-bold py-2 px-4 rounded-md  border border-gray-300"
                      onClick={async () => {
                        const res = await axios.delete(
                          `${process.env.BACKEND_URL}/delete_reservation?transaction_id=${room.transaction_id}`
                        );
                        if (res.data.error) {
                          toast.error(res.data.error);
                        } else {
                          toast.success(res.data.message);
                          router.reload();
                        }
                      }}
                    >
                      Discard
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : null;
}

export default Reservation;

export async function getServerSideProps() {
  const data = await axios.get(
    `${process.env.BACKEND_URL}/pending_reservations`
  );
  return {
    props: {
      pending_rooms: data.data.data,
      no_of_pending_rooms: data.data.count,
    },
  };
}
