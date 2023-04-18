import React from "react";
import GridLoader from "react-spinners/GridLoader";

function Loading() {
  return (
    <div className="mx-auto mt-24">
      <GridLoader
        color={"fuchsia"}
        loading={true}
        aria-label="Loading Spinner"
        size={20}
      />
    </div>
  );
}

export default Loading;
