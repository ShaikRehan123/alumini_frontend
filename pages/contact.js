import Navbar from "../components/Header";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen h-screen space-y-4 overflow-hidden bg-accent">
        <div className="h-[50%] [background-image:url('http://localhost/alumni/images/3.jpg');] [background-size:cover;] [background-position:center_center;]"></div>
        <div className="mx-auto w-[80%] text-3xl flex flex-col space-y-2">
          <h1 className="text-secondary">Contact Information</h1>
          <div className="flex justify-between">
            <div className="h-64 p-3 space-y-4 text-gray-400 bg-white rounded-md shadow-lg w-96">
              <h1>
                Address: <br /> test Address Test Address test Address Test
                Address
              </h1>
              <h1>
                Phone: <br /> +91 9638527410 Email: admin@gmail.com
              </h1>
            </div>
            <div className="bg-white w-[700px] h-64 justify-start items-center flex p-2 space-x-16 ">
              <div className="flex flex-col space-y-5">
                <input
                  type="text"
                  className="w-64 p-2 transition-all border-2 border-gray-400 rounded-md outline-none focus:border-secondary"
                  placeholder="Name"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-64 p-2 transition-all border-2 border-gray-400 rounded-md outline-none focus:border-secondary"
                />
                <button className="p-3 text-gray-500 transition-all rounded-md hover:bg-teritory2 hover:text-white bg-teritory">
                  Send Message
                </button>
              </div>
              <textarea
                placeholder="Message"
                className="w-64 p-2 text-base transition-all border-2 border-gray-400 rounded-md outline-none resize-none focus:border-secondary h-60"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
