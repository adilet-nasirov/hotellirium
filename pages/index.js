import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";
import styles from "../styles/Home.module.css";
import cardsData from "../lib/data-files/cardsData";
import exploreData from "../lib/data-files/exploreData";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import AlertTitle from "@mui/material/AlertTitle";
export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const { status } = router.query;
  return (
    <div className={styles.container}>
      <Head>
        <title>Hotellirium</title>
        <meta name="Great Deals" content="Hotels are just one click away" />
        <link rel="icon" href="/logo.png" />
      </Head>
      {status && status === "success" && (
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              // variant="filled"
              severity="success"
              action={
                <IconButton
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon color="inherit" size="small" />
                </IconButton>
              }
              sx={{ m: 1, fontSize: 16 }}
            >
              Payment Successful! More information and guidelines will be sent
              via email.
            </Alert>
          </Collapse>
        </Box>
      )}
      {status && status === "cancel" && (
        <Alert severity="error">
          <AlertTitle>Payment Unsuccessfull, Try Again</AlertTitle>
        </Alert>
      )}
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto">
        <section className="pt-6 mx-4 md:mx-0 ">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* Pull some data from a server */}
          <div className="grid grid-cols-1 mx-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items:center">
            {exploreData.map((item) => (
              <SmallCard
                key={item.img}
                img={item.img}
                distance={item.distance}
                location={item.location}
              />
            ))}
          </div>
        </section>
        <section className="max-w-7xl mx-auto box-border">
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-4 overflow-scroll scrollbar-hide py-3">
            {cardsData.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>
        {/* Large card section */}
        <section className="max-w-7xl mx-auto">
          <LargeCard
            img={"https://links.papareact.com/4cj"}
            title={"The Greatest Outdoors"}
            description={"Wishlists curated by Hotellirium"}
            buttonText={"Get Inspired"}
          />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
