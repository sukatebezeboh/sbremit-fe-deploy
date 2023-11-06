import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkAuth } from "../../../redux/actions/actions";
import ForAuthUsers from "./ForAuthUsers";
import NotAuthUser from "./NotAuthUsers";

const TransferComplete = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  useEffect(() => {
    checkAuth();
  }, []);

  return <>{isAuthenticated ? <ForAuthUsers /> : <NotAuthUser />}</>;
};

export default TransferComplete;
