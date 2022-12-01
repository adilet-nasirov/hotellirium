import React from "react";
import ordo from "../../lib/data-files/ordo";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InfoCard from "../../components/InfoCard";
const App = () => {
  const data = ordo;
  return (
    <div>
      <Header />
      <main className={!data ? "h-screen " : ""}>
        <div className="max-w-7xl mx-auto">
          {data ? (
            data &&
            data?.map((item) => {
              return <InfoCard item={item} key={item.id} />;
            })
          ) : (
            <></>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
