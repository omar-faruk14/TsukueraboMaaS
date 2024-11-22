"use client";
import React from "react";
import dynamic from "next/dynamic";

import CustomLoading from "@Om/components/CustomLoading/CustomLoading";

const MapView = dynamic(
  () => import("@Om/app/Nagano_Reservation/map/realTimeMap/RealTime_with_new_KMZ"),
  {
    loading: () => <CustomLoading />,
    ssr: false,
  }
);

const MapPage = () => {
  return (
    <div>
      <div>
        <MapView />
      </div>
    </div>
  );
};

export default MapPage;