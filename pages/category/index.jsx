import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Empty } from "antd";

const App = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-96 my-40">
        <Empty className="text-slate-400	" description={"OOPS..."} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
