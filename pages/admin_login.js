import axios from "axios";
import { getCookie, setCookies } from "cookies-next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
const Header = dynamic(() => import("../components/Header"), {
  ssr: false,
});

const Login = ({ user_id }) => {
  const router = useRouter();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;

    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please enter Username and password");
      return;
    }

    // Email Regex Validation
    // const emailRegex =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (!emailRegex.test(email)) {
    //   toast.error("Please enter a valid email");
    //   return;
    // }

    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/admin_login`, {
        email,
        password,
      });

      console.log(res.data);

      if (res.data.message === "Successfully Logged In") {
        toast.success("Login Successful");
        // Set Cookie
        const { data } = res.data;
        // console.log(data);
        // console.log(JSON.parse(data));
        let admindID = JSON.parse(data)[0];
        console.log(admindID);
        setCookies("admin_id", admindID);
        // Redirect to Home Page
        router.replace("/");
      } else {
        toast.error("Invalid Username or Password");
      }
    } catch (err) {
      toast.error("Error: " + err);
    }
  };
  return (
    <>
      <Header />
      <div className="w-screen h-screen space-y-4 bg-accent">
        <div className="h-[40%] [background-image:url('http://localhost/alumni/images/3.jpg');] [background-size:cover;] [background-position:center_center;]"></div>
        <div className="flex flex-col space-y-2 ">
          <div className="container mx-auto">
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <form
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
                  onSubmit={handleFormSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Username
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="Username"
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
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const { req, res } = context;
  console.log(req, res);
  if (
    getCookie("admin_id", { req, res }) ||
    getCookie("user_id", { req, res }) !== undefined
  ) {
    // Redirect to / if user is logged in
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
  return {
    props: {
      user_id: "thera kat gaya",
    },
  };
}
