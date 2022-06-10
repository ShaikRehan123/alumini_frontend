import dynamic from "next/dynamic";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Head from "next/head";
import axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
const Header = dynamic(() => import("../components/Header"), {
  ssr: false,
});
const BookRoom = ({ room_data }) => {
  const router = useRouter();
  const [bookingDate, setBookingDate] = useState(new Date());
  const [arrivalFrom, setArrivalFrom] = useState("");
  const [purposeOfTheVisit, setPurposeOfTheVisit] = useState("");
  console.log(room_data);
  return (
    <>
      <Head>
        <title>Book Room</title>
      </Head>
      <Header />
      <div className="w-screen h-screen space-y-4 ">
        <div className="h-[40%] [background-image:url('http://localhost/alumni/images/3.jpg');] [background-size:cover;] [background-position:center_center;]"></div>
        <div className="border-2 border-gray-700 w-[80%] mx-auto p-5 space-y-4 flex flex-col">
          <h1 className="text-3xl text-center">MAKE A RESERVATION</h1>
          <div className="flex flex-row space-x-16 justify-center items-center">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl">{room_data.room_type}</h1>
              <h1 className="text-2xl text-cyan-300">Rs. {room_data.price}</h1>
              <img
                src={`http://localhost/alumni/photo/${room_data.photo}`}
                className="object-cover w-[800px]"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="" className="text-md text-gray-400">
                Check In
              </label>
              <DatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                wrapperClassName="datepicker"
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
              />
              <div>
                <label htmlFor="arrival_from" className="text-md text-gray-400">
                  Arrival From
                </label>
                <input
                  placeholder="Arrival From"
                  className="w-full h-14 outline-none border-[#523838] border-2 placeholder:text-center placeholder:text-[#444] text-gray-700 focus:border-gray-700 transition-all p-3 font-bold placeholder:font-normal"
                  name="arrival_from"
                  value={arrivalFrom}
                  onChange={(e) => setArrivalFrom(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="purpose_of_the_visit"
                  className="text-md text-gray-400"
                >
                  Purpose of the visit
                </label>
                <input
                  placeholder="Purpose of the visit"
                  className="w-full h-14 outline-none border-[#523838] border-2 placeholder:text-center placeholder:text-[#444] text-gray-700 focus:border-gray-700 transition-all p-3 font-bold placeholder:font-normal mb-4"
                  name="purpose_of_the_visit"
                  value={purposeOfTheVisit}
                  onChange={(e) => setPurposeOfTheVisit(e.target.value)}
                />
              </div>
              <button
                className="w-full h-14 bg-transparent text-gray-500  border border-cyan-300 hover:bg-cyan-400 transition-all hover:text-white font-bold p-3 "
                type="submit"
                onClick={async () => {
                  console.table({
                    booking_date: bookingDate.toISOString().slice(0, 10),
                    arrival_from: arrivalFrom,
                    purpose_of_the_visit: purposeOfTheVisit,
                  });

                  // Nothing should be empty
                  if (
                    bookingDate === "" ||
                    arrivalFrom === "" ||
                    purposeOfTheVisit === ""
                  ) {
                    toast.error("Please fill all the fields");
                    return;
                  }

                  // console.log()
                  const user_data = JSON.parse(getCookie("user_id"));
                  console.log(user_data);
                  try {
                    const data = await axios.post(
                      `${process.env.BACKEND_URL}/add_guest`,
                      {
                        name: user_data.u_name,
                        email: user_data.u_email_id,
                        mobile: user_data.u_mobileno,
                        userid: user_data.u_id,
                        room_id: room_data.room_id,
                        booking_date: bookingDate.toISOString().slice(0, 10),
                        arrival_from: arrivalFrom,
                        purpose_of_the_visit: purposeOfTheVisit,
                      }
                    );
                    console.log(data.data);
                    if (data.data.error) {
                      toast.error(data.data.error);
                      return;
                    }

                    if (data.data.message == "Already Booked on this date") {
                      toast.error("Please try another date");
                      toast.error(
                        "Look's like someone already booked on this date"
                      );
                      return;
                    }
                    toast.success("Booking Successful");
                    router.push("/my_bookings");
                  } catch (err) {
                    toast.error("Something went wrong");
                  }
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  // get room_id from url
  const room_id = query.id;
  console.log(room_id);
  const data = await axios.get(
    `${process.env.BACKEND_URL}/room_details/${room_id}`
  );
  return {
    props: {
      room_data: data.data.data[0],
    },
  };
};

export default BookRoom;
