import { useSelector } from "react-redux";
import { VerificationComponent } from "./VerificationComponent";
import Body from './Verification.css';
import PageHeading from "../../modules/page-heading/PageHeading";
import { useEffect } from "react";

const Verification = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <VerificationComponent />
  );
  // return (
  //   <Body>
  //       <div className="page-content">
  //         {/* <PageHeading
  //           heading="Verification"
  //           subheading='Enter information to verify your identity'
  //         /> */}
  //         <VerificationComponent />
  //       </div>
  //   </Body>
  // );
};

export default Verification;
