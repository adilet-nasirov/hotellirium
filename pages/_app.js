import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { DataProvider } from '../lib/DataContext';

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "bar-of-progress",
  delay: 500,
});

Router.events.on("routeChangeStart", ()=>progress.start());
Router.events.on("routeChangeComplete",()=> progress.finish());
Router.events.on("routeChangeError", ()=>progress.finish());
function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  )
}

export default MyApp
