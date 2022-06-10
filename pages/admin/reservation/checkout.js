import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import AdminReservationHeader from "../../../components/AdminReservationHeader";
const AdminHeader = dynamic(() => import("../../../components/AdminHeader"), {
  ssr: false,
});
function Reservation({ checkin_rooms }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // at init only
  console.log(router.pathname);
  console.log(checkin_rooms);
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
        <AdminReservationHeader />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr className=" ">
                <th scope="col" className="px-2 py-3">
                  Name
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
                  Room no
                </th>
                <th scope="col" className="px-6 py-3">
                  Check In
                </th>
                <th scope="col" className="px-6 py-3">
                  Days
                </th>
                <th scope="col" className="px-6 py-3">
                  Check Out
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Extra Bed
                </th>
                <th scope="col" className="px-6 py-3">
                  Bill
                </th>
                <th scope="col" className="px-6 py-3">
                  {/* Check Out Button */}
                  {/* Action */}
                </th>
              </tr>
            </thead>
            <tbody>
              {checkin_rooms.map((room) => (
                <tr
                  key={room.transaction_id}
                  className="border-b   odd:bg-white even:bg-gray-50 "
                >
                  <th scope="row" className="px-3 py-3">
                    {room.name}
                  </th>
                  <td className="px-3 py-3">{room.room_type}</td>
                  <td className="px-3 py-3">{room.a_from}</td>
                  <td className="px-3 py-3">{room.a_visit}</td>
                  <td className="px-3 py-3">{room.room_no}</td>
                  <td className="px-3 py-3 text-green-500">
                    {
                      //  Show checkin date like this format Jul 01, 2020 @ 12:00 PM
                      new Date(room.checkin).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                    @{" "}
                    {
                      // Checkin time is like this format "13:38:08" you need to change it to h:m pm||am
                      // use split to get the time and then show like this format "12:00 PM"
                      `
                      ${room.checkin_time.split(":")[0] - 12}:${
                        room.checkin_time.split(":")[1]
                      } ${room.checkin_time.split(":")[0] > 12 ? "PM" : "AM"}
                      `
                    }
                  </td>
                  <td className="px-3 py-3">{room.days}</td>
                  <td className="px-3 py-3 text-red-500">
                    {
                      //  Show checkin date like this format Jul 01, 2020 @ 12:00 PM
                      new Date(room.checkout).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                  </td>
                  <td className="px-3 py-3">{room.status}</td>
                  <td className="px-3 py-3">{room.extra_bed}</td>
                  <td className="px-3 py-3">{room.bill}</td>
                  <td className=" text-green-500 p-3">Paid</td>
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
    `${process.env.BACKEND_URL}/checkout_reservation`
  );
  return {
    props: {
      checkin_rooms: data.data.data,
    },
  };
}
