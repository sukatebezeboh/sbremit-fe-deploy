import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { confirmAccountEmail } from "../../../redux/actions/actions";

const ConfirmAccount = () => {
  const history = useHistory();
  useEffect(() => {
    // confirmAccountEmail((route: string) => history.push(route))
  }, []);

  return (
    <div style={{ height: "130vh" }}>
      <div className="center"></div>
    </div>
  );
};

export default ConfirmAccount;
