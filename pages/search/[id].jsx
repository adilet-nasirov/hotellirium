import React from "react";
import { useRouter } from "next/router";
const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Details pagee</h1>
      <h2>{id}</h2>
    </div>
  );
};

export default Details;
