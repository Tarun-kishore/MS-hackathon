import React from "react";
import PublicProfileCard from "./PublicProfileCard";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function PublicProfile(props) {
  const { userId } = useParams();
  return (
    <div>
      <PublicProfileCard id={userId} />
    </div>
  );
}

