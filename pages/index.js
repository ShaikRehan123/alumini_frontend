// import Swiper core and required modules
import dynamic from "next/dynamic";
import Head from "next/head";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
const Navbar = dynamic(() => import("../components/Header"), {
  ssr: false,
});

// install Swiper modules
SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Alumini Guest House</title>
      </Head>
      <Navbar />
      <>
        <Swiper
          effect={"fade"}
          // navigation={true}
          // pagination={{
          //   clickable: true,
          // }}
          loop={true}
          autoplay={true}
          className="mySwiper"
          centeredSlides={true}
          centeredSlidesBounds={true}
        >
          <SwiperSlide>
            <div className="bg bg1">
              <div className="flex flex-col items-center space-y-4">
                <h1 className="text-5xl text-white font-roboto animate__animated animate__zoomIn">
                  Welcome To
                </h1>
                <h1 className="text-3xl text-white animate__animated animate__zoomIn">
                  Alumini Guest House Online Booking System
                </h1>
              </div>
            </div>
            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg bg2">
              <div className="flex flex-col items-center space-y-4">
                <h1 className="text-5xl text-white font-roboto animate__animated animate__zoomIn">
                  Welcome To
                </h1>
                <h1 className="text-3xl text-white animate__animated animate__zoomIn">
                  Alumini Guest House Online Booking System
                </h1>
              </div>
            </div>
            {/* <img src="https://swiperjs.com/demos/images/nature-2.jpg" /> */}
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
}
