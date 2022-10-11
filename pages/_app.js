import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { GlobalProvider } from '../GlobalState/Context';

const progress = new ProgressBar({
  size: 5,
  color: "#FE595E",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", ()=>progress.start());
Router.events.on("routeChangeComplete",()=> progress.finish());
Router.events.on("routeChangeError", ()=>progress.finish());
function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

export default MyApp
