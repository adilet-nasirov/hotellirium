import React, { useState, useEffect } from "react";
import {
  Puff,
  InfinitySpin,
  Triangle,
  Dna,
  LineWave,
  MutatingDots,
  Oval,
  Rings,
  ThreeDots,
} from "react-loader-spinner";

const Test = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <div className="h-screen w-screen bg-slate-100 flex justify-center items-center">
          {/* <Puff
            height="120"
            width="120"
            radius={2}
            color="#FF385C"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> */}
          {/* <InfinitySpin width="300" color="#FF385C" /> */}
          {/* <Triangle
            height="180"
            width="180"
            color="#FF385C"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          /> */}
          {/* <Dna
            visible={true}
            height="120"
            width="120"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          /> */}
          {/* <LineWave
            height="150"
            width="150"
            color="#FF385C"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          /> */}
          <MutatingDots
            height="100"
            width="100"
            color="#FF385C"
            secondaryColor="#FF385C"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          {/* <Oval
            height={80}
            width={80}
            color="#FF385C"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#FF385C"
            strokeWidth={2}
            strokeWidthSecondary={2}
          /> */}
          {/* <Rings
            height="80"
            width="80"
            color="#FF385C"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          /> */}
          {/* <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#FF385C"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          /> */}
        </div>
      ) : (
        <div> Hello world</div>
      )}
    </div>
  );
};

export default Test;
