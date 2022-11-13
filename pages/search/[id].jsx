import React, { useContext } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../../lib/DataContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InfoCard from "../../components/InfoCard";
const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useContext(DataContext);
  const { data } = state;
  const item = data.filter((el) => el.id === id);
  console.log(item);
  return (
    <div>
      <Header />
      <h1>Details pagee</h1>
      <InfoCard item={item[0]} />

      <Footer />
    </div>
  );
};

export default Details;
