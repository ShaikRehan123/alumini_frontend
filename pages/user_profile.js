import { getCookie, setCookies } from "cookies-next";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
const Header = dynamic(() => import("../components/Header"), {
  ssr: false,
});
import { useRouter } from "next/router";
const UserProfile = ({ user_data }) => {
  const router = useRouter();
  console.log(user_data);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;
    let name = e.target.elements.name?.value;
    let username = e.target.elements.username?.value;
    let mobile_no = e.target.elements.mobile_no?.value;
    // console.log(e.target.elements)

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      name.trim() === "" ||
      username.trim() === "" ||
      mobile_no.trim() === ""
    ) {
      toast.error("All fields should be filled");
      return;
    }

    // Email Regex Validation
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    // mobile Number Validation
    if (mobile_no.length !== 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    console.log(email, password, name, username, mobile_no);

    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/update_user  `, {
        name,
        username,
        mobile_no,
        email,
        password,
      });

      console.log(res.data);

      if (res.data.error) {
        toast.error(res.data.sqlMessage);
        return;
      }

      if (res.data.message === "Successfully Updated") {
        toast.success("Upated User Successfully");
        // Set Cookie
        const { data } = res.data;
        // console.log(data);
        // console.log(JSON.parse(data));
        let uID = JSON.parse(data)[0];
        console.log(uID);
        setCookies("user_id", uID);
        // Redirect to Home Page
        router.reload();
      }
    } catch (err) {
      toast.error("Error: " + err);
    }
  };
  return (
    <>
      <Header />
      <div className="h-screen w-screen ">
        <>
          <div className="user_profile_bg flex justify-center items-center">
            <div className="flex flex-col space-y-2 ">
              <div className="container mx-auto">
                <div className="flex justify-center">
                  <div className="w-[500px] bg-white h-[550px]  rounded shadow-md flex  flex- col justify-center items-center backdrop-filter backdrop-blur-lg  border border-gray-200 bg-opacity-30">
                    <form
                      className="px-8 pt-6 pb-8 mb-4  w-full   "
                      onSubmit={handleFormSubmit}
                    >
                      <div className="mb-4 ">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Name"
                          defaultValue={user_data.u_name}
                        />
                      </div>
                      <div className="mb-4 ">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="mobile_no"
                        >
                          Mobile No
                        </label>
                        <input
                          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="mobile_no"
                          type="text"
                          placeholder="Mobile No"
                          defaultValue={user_data.u_mobileno}
                        />
                      </div>
                      <div className="mb-4 ">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Email"
                          defaultValue={user_data.u_email_id}
                        />
                      </div>
                      <div className="mb-4 ">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="username"
                        >
                          Username
                        </label>
                        <input
                          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Username"
                          defaultValue={user_data.u_username}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="password"
                          type="text"
                          placeholder="******************"
                          defaultValue={user_data.u_password}
                        />
                      </div>
                      <div className="flex flex-row items-center justify-center">
                        <button
                          className="px-4 py-2 font-bold text-white bg-blue-500 rounded transition-all shadow-lg shadow-blue-200 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  const { req, res } = context;
  console.log(req, res);
  if (getCookie("user_id", { req, res }) === undefined) {
    // Redirect to / if user is not  logged in
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const user_data = JSON.parse(getCookie("user_id", { req, res }));
  return {
    props: {
      user_data,
    },
  };
}
