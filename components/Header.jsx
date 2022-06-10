import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie, removeCookies } from "cookies-next";

export default function Navbar({ fixed }) {
  const [isScrolled, setIsScrolled] = useState(false);
  // Add Listener if page is scrolled or not

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  const router = useRouter();
  return (
    <>
      <nav
        className={`fixed top-0 z-10 w-full bg-transparent bg-opacity-0 ${
          isScrolled
            ? "shadow-2xl border-b-0 backdrop-filter backdrop-blur-lg bg-opacity-30  border-gray-200"
            : "shadow-none"
        } trasition-shadow duration-200 ease-in-out`}
      >
        <div className="max-w-5xl px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <span
              className="text-2xl font-semibold cursor-pointer text-primary"
              onClick={() => {
                router.push("/");
              }}
            >
              ALUMNI GUEST HOUSE
            </span>
            <div className="hidden space-x-4 md:flex text-primary">
              <span
                className="text-lg cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                Home{" "}
              </span>
              <span
                className="text-lg cursor-pointer"
                onClick={() => {
                  router.push("/contact");
                }}
              >
                Contact
              </span>
              <span
                className={`${
                  getCookie("user_id") ? "text-lg cursor-pointer" : "hidden"
                }`}
                onClick={() => {
                  router.push("/rooms");
                }}
              >
                Rooms
              </span>

              <span
                className={`${
                  getCookie("user_id") ? "text-lg cursor-pointer" : "hidden"
                }`}
                onClick={() => {
                  router.push("/user_profile");
                }}
              >
                Profile
              </span>
              <span
                className={`${
                  getCookie("user_id") ? "text-lg cursor-pointer" : "hidden"
                }`}
                onClick={() => {
                  router.push("/my_bookings");
                }}
              >
                My bookings
              </span>
              <span
                className={`${
                  getCookie("user_id") || getCookie("admin_id")
                    ? "hidden"
                    : "text-lg cursor-pointer"
                }`}
                onClick={() => {
                  router.push("/user_login");
                }}
              >
                {getCookie("user_id") || getCookie("admin_id")
                  ? ""
                  : "User Login"}
              </span>

              <span
                className={`${
                  getCookie("user_id") || getCookie("admin_id")
                    ? "hidden"
                    : "text-lg cursor-pointer"
                }`}
                onClick={() => {
                  router.push("/admin_login");
                }}
              >
                {getCookie("user_id") || getCookie("admin_id")
                  ? ""
                  : "Admin Login"}
              </span>
              <span
                className={`${
                  getCookie("admin_id") ? "text-lg cursor-pointer" : "hidden"
                }`}
                onClick={() => {
                  router.push("/admin/accounts");
                }}
              >
                Accounts
              </span>
              <span
                className={`${
                  getCookie("admin_id") ? "text-lg cursor-pointer" : "hidden"
                }`}
                onClick={() => {
                  router.push("/rooms");
                }}
              >
                Reservation
              </span>
              <span
                className={`${
                  getCookie("admin_id") ? "text-lg cursor-pointer" : "hidden"
                }`}
                onClick={() => {
                  router.push("/rooms");
                }}
              >
                Room
              </span>
              <span
                className={`${
                  getCookie("admin_id") ? "text-lg cursor-pointer" : "hidden"
                }`}
                onClick={() => {
                  router.push("/rooms");
                }}
              >
                Users
              </span>
              <span
                className="text-lg cursor-pointer"
                onClick={() => {
                  // router.push("/admin_login");
                  if (getCookie("user_id")) {
                    removeCookies("user_id");
                    router.replace("/");
                  } else if (getCookie("admin_id")) {
                    removeCookies("admin_id");
                    router.replace("/");
                  }
                }}
              >
                {getCookie("user_id") || getCookie("admin_id") ? "Logout" : ""}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
