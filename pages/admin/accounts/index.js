import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const AdminHeader = dynamic(() => import("../../../components/AdminHeader"), {
  ssr: false,
});
function Accounts({ admins, href }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // at init only
  console.log(router.pathname);
  console.log(admins);
  return mounted ? (
    <>
      <AdminHeader />
      <div className="flex p-5 space-x-3 items-center">
        <span className={`text-cyan-500`}>Home</span>
        <span
          className={`${"bg-blue-600 text-white p-2 rounded-md "}`}
          onClick={() => {
            router.push("/admin/accounts");
          }}
        >
          Account
        </span>
        <span
          className={` text-cyan-500
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
      <div className="border border-gray-300 rounded-md w-[95%] m-auto p-5 space-y-4">
        <div className="bg-cyan-200 bg-opacity-75 w-full h-14 flex items-center p-3">
          <h1 className="text-blue-300">Accounts</h1>
        </div>
        <div className="">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Password
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin.admin_id}
                  className="border-b   odd:bg-white even:bg-gray-50 odd: even:"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {admin.name}
                  </td>
                  <td className="px-6 py-4">{admin.username}</td>
                  <td className="px-6 py-4">{admin.password}</td>
                  {/* <div className="bg-yellow-400 "> */}
                  <td
                    className="px-6 py-4 flex  text-yellow-500 cursor-pointer"
                    onClick={() => {
                      router.push(
                        `/admin/accounts/edit?admin_id=${admin.admin_id}`
                      );
                    }}
                  >
                    Edit
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

export default Accounts;

export async function getServerSideProps(context) {
  const admins = await axios.get(`${process.env.BACKEND_URL}/get_all_admins`);
  console.log(admins.data);
  return {
    props: {
      admins: admins.data.data,
    },
  };
}
