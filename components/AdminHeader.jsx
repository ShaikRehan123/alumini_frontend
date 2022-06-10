import { useRouter } from "next/router";
export default function Navbar({ fixed }) {
  const router = useRouter();
  return (
    <>
      <nav
        className="relative top-0 z-10 w-full bg-transparent shadow-2xl border-b-0 backdrop-filter backdrop-blur bg-opacity-30 border-gray-200
         transition-all duration-200 ease-in-out"
      >
        <div className="max-w-5xl px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <span
              className="text-2xl font-semibold cursor-pointer text-gray-700"
              onClick={() => {
                router.push("/");
              }}
            >
              ALUMNI GUEST HOUSE
            </span>
            <div className="hidden space-x-4 md:flex text-gray-700">
              <span
                className="text-lg cursor-pointer"
                // onClick={() => {
                // router.push("/");
                // }}
              >
                Administrator
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
