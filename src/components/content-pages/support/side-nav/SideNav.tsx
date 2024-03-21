import { asset } from "../../../../util/util";
import Scrollspy from "react-scrollspy";
import Div from "./SideNav.css";

const SideNav = (props: { list: string[] }) => {
  const { list } = props;

  const scrollSections = list.map((d, i) => "section_" + i);

  return (
    <Div>
      <Scrollspy
        style={{ listStyle: "none", paddingLeft: "20px" }}
        items={scrollSections}
        currentClassName="selected"
      >
        {list.map((section, i) => {
          return (
            <li className={`section-nav`}>
              {" "}
              <a href={`#section_${i}`}>{section}</a>
            </li>
          );
        })}
      </Scrollspy>

      <div className="contact">
        <h4>Contact Information</h4>

        <div className="info">
          <div className="text">The best way to contact us for any issue:</div>
          <div className="value">
            {" "}
            <img src={asset("icons", "email.svg")} alt="mail" />{" "}
            <div className="value-text">support@sbremit.com.</div>{" "}
          </div>
        </div>

        <div className="info">
          <div className="text">You may also call us at:</div>
          <div className="value">
            {" "}
            <img src={asset("icons", "phone-call.svg")} alt="call" />{" "}
            <div className="value-text">+44(0)3301334158</div>{" "}
          </div>
        </div>
      </div>
    </Div>
  );
};

export default SideNav;
