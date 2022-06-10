import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Navbar = dynamic(() => import("../components/Header"), {
  ssr: false,
});
import axios from "axios";
const Room = ({ rooms }) => {
  const router = useRouter();
  console.log(rooms);

  if (rooms === undefined) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (rooms.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">No Rooms Available</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {/* <div className="bg-transparent"> */}
        <Head>
          <title>Rooms</title>
        </Head>
        <Navbar />
        {/* </div> */}
        <div className="w-screen h-screen space-y-4">
          <div className="h-[40%] [background-image:url('http://localhost/alumni/images/3.jpg');] [background-size:cover;] [background-position:center_center;]"></div>
          <div className="flex flex-col space-y-2 text-3xl ">
            {/* Add Date Picker Here */}

            {/* <h1 className="text-center">Check availibity of Rooms</h1> */}
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} wrapperClassName="datepicker" /> */}
            <h1 className="pt-8 font-semibold text-center text-gray-600">
              Our Rooms{" "}
            </h1>
            {/* <div className="border-b-2 border-yellow-300 w-[250px]"> */}

            {/* </div> */}
            <div className="max-w-2xl px-4 py-10 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>
              <div className="w-full h-full mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {rooms?.map((product) => (
                    <span key={product.room_id} href={``} className="group">
                      <div className="overflow-hidden bg-gray-200 rounded-lg w aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 md:w-[300px] md:h-[300px] w-[500px] h-[500px]">
                        <img
                          src={`http://localhost/alumni/images/${product.photo}`}
                          // alt={product.imageAlt}
                          className="object-cover object-center w-full h-full group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700 text-center">
                        {product.room_type}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-900 text-center">
                        {product.price}
                      </p>
                      <div className="flex justify-center items-center">
                        <button
                          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition cursor-pointer "
                          onClick={() => {
                            router.push(`/book_room?id=${product.room_id}`);
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Room;

export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.BACKEND_URL}/rooms`);
  console.log(res.data);
  return {
    props: {
      rooms: res.data.data,
    },
  };
}
