import { useSelector } from "react-redux";
import { VerificationComponent } from "./VerificationComponent";
import Body from './Verification.css';
import PageHeading from "../../modules/page-heading/PageHeading";

// const Verification = () => {
//   return (
//     <>
//       {/* <NavBar /> */}
//       <VerificationComponent />
//     </>
//   );
// };
const Verification = () => {
  return (
    <Body>
        <div className="page-content">
          <PageHeading
            heading="Verification"
            subheading='Enter information to verify your identity'
          />
          <VerificationComponent />
        </div>
    </Body>
  );
};

export default Verification;
