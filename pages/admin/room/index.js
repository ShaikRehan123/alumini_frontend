import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
const AdminHeader = dynamic(() => import("../../../components/AdminHeader"), {
  ssr: false,
});
function Rooms({ roomms, href }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // at init only
  console.log(router.pathname);
  console.log(roomms);
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
          className={`text-cyan-500`}
          onClick={() => {
            router.push("/admin/reservation");
          }}
        >
          Reservation
        </span>
        <span className={`bg-blue-600 text-white p-2 rounded-md`}>Room </span>
        <span className={`text-cyan-500`}>Users</span>
      </div>
      <div className="border border-gray-300 rounded-md w-[95%] m-auto p-5 space-y-4">
        <div className="bg-cyan-200 bg-opacity-75 w-full h-14 flex items-center p-3">
          <h1 className="text-blue-300">Rooms</h1>
        </div>
        <button
          className="bg-green-600 p-3 rounded-md text-white"
          onClick={() => {
            router.push("/admin/room/add");
          }}
        >
          Add Room
        </button>
        <div className="">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Room Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {roomms.map((room) => (
                <tr
                  key={room.room_id}
                  className="border-b   odd:bg-white even:bg-gray-50 odd: even:"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {room.room_type}
                  </td>
                  <td className="px-6 py-4">{room.price}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://localhost/alumni/images/${room.photo}`}
                      alt="room"
                      className="w-full h-32"
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  {/* <div className="bg-yellow-400 "> */}
                  <td className="px-6 py-4 flex justify-center items-center h-full  text-yellow-500  space-x-3">
                    <button
                      className="bg-yellow-500 text-white rounded-md p-3 w-full cursor-pointer"
                      onClick={() => {
                        router.push(`/admin/room/edit?room_id=${room.room_id}`);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 rounded-md  text-white  p-3 w-full cursor-pointer"
                      onClick={async () => {
                        const data = await axios.delete(
                          `${process.env.BACKEND_URL}/delete?room_id=${room.room_id}`
                        );
                        if (data.data.error) {
                          toast.error(data.data.error);
                        } else {
                          toast.success(data.data.message);
                          router.reload();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  {/* </div> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : null;
}

export default Rooms;

export async function getServerSideProps(context) {
  const roomms = await axios.get(`${process.env.BACKEND_URL}/get_all_rooms`);
  console.log(roomms.data);
  return {
    props: {
      roomms: roomms.data.data,
    },
  };
}
