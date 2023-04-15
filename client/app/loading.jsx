import React from "react";
import GridLoader from "react-spinners/GridLoader";

function Loading() {
  return (
    <div>
      <GridLoader
        color={"fuchsia"}
        loading={true}
        aria-label="Loading Spinner"
        size={50}
      />
    </div>
  );
}

export default Loading;
