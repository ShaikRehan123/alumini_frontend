import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"), {
  ssr: false,
});
import axios from "axios";
import { getCookie } from "cookies-next";

const MyBookings = ({ userBookings }) => {
  console.log(userBookings);
  return (
    <>
      <Header />
      <div className="w-screen h-screen space-y-4 bg-accent">
        <div className="h-[40%] [background-image:url('http://localhost/alumni/images/3.jpg');] [background-size:cover;] [background-position:center_center;]"></div>
        <div className="p-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Arrival From
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Purpose of Visit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Room Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Room No
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
                </tr>
              </thead>
              <tbody>
                {userBookings.map((booking) => (
                  <tr
                    key={booking.transaction_id}
                    className="border-b   odd:bg-white even:bg-gray-50 odd: even:"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {booking.a_from}
                    </th>
                    <td className="px-6 py-4">{booking.a_visit}</td>
                    <td className="px-6 py-4">{booking.room_type}</td>
                    <td className="px-6 py-4">{booking.room_no}</td>
                    <td className="px-6 py-4">
                      {new Date(booking.checkin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{booking.days}</td>
                    <td className="px-6 py-4">
                      {
                        // Make sure check out date is not 0000-00-00 it its 0000-00-00 then show check out date as N/A
                        booking.checkout !== "0000-00-00"
                          ? new Date(booking.checkout).toLocaleDateString()
                          : "N/A"
                      }
                    </td>
                    <td className="px-6 py-4">
                      {
                        // if status is Check In then show Check In else if status is Check Out then show Check Out else pending
                        booking.status === "Check In"
                          ? "Check In"
                          : booking.status === "Check Out"
                          ? "Check Out"
                          : "Pending"
                      }
                    </td>
                    <td className="px-6 py-4">
                      {
                        // if extra bed is 0 then N/A else show extra bed
                        booking.extra_bed === 0 ? "N/A" : booking.extra_bed
                      }
                    </td>
                    <td className="px-6 py-4">
                      {
                        // if bill is 0 then N/A else show bill
                        booking.bill === "" ? "N/A" : `₹${booking.bill}.00`
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const user_id = JSON.parse(getCookie("user_id", { req, res }));
  console.log(user_id.u_id);
  const userBookings = await axios.get(
    `${process.env.BACKEND_URL}/user_bookings/${user_id.u_id}`
  );
  // console.log(userBookings.data);
  return {
    props: {
      userBookings: userBookings.data.data,
    },
  };
};

export default MyBookings;
