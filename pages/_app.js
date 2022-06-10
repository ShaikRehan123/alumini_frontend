import "../styles/globals.css";
import "swiper/css/bundle";
import "animate.css";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        options={{
          trickleSpeed: 200,
          showSpinner: false,
          minimum: 0.3,
          easing: "ease",
          speed: 200,
          trickle: true,
          color: "#ff0000",
          trailColor: "#fff",
          trailWidth: 1,
          barColor: "#ff0000",
          barWidth: 1,
          height: "2px",
        }}
      />
      <Toaster position="top-left" reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
