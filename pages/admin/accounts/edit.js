import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
const AdminHeader = dynamic(() => import("../../../components/AdminHeader"), {
  ssr: false,
});
const Edit = ({ admin }) => {
  console.log(admin);
  const [name, setName] = useState(admin.name);
  const [username, setUsername] = useState(admin.username);
  const [password, setPassword] = useState(admin.password);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // at init only
  console.log(router.pathname);
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
      <div className="border border-gray-300 rounded-md w-[95%] m-auto p-5 space-y-6">
        <div className="bg-cyan-200 bg-opacity-75 w-full h-14 flex items-center p-3">
          <h1 className="text-blue-800">Account / Change Account</h1>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all focus:shadow-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all focus:shadow-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all focus:shadow-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-yellow-500 transition-all hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={async () => {
              const data = await axios.put(
                `${process.env.BACKEND_URL}/update_admin`,
                {
                  admin_id: admin.admin_id,
                  name,
                  username,
                  password,
                }
              );
              if (data.data.message == "Successfully Updated") {
                toast.success("Successfully Updated");
                router.push("/admin/accounts");
              }
              console.log(data);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default Edit;

// get server side props , get admin_id query param from url

export async function getServerSideProps(context) {
  const admin_id = context.query.admin_id;
  console.log(admin_id);
  const admin = await axios.get(
    `${process.env.BACKEND_URL}/get_admin_by_id?admin_id=${admin_id}`
  );
  console.log(admin.data);
  return {
    props: {
      // admin: admin.data.data,
      admin: admin.data.data[0],
    },
  };
}
