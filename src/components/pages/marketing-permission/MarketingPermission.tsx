import React, { useState } from "react";
import NavBar from "components/modules/navbar/NavBar";
import { Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editUserSettingsAction } from "redux/actions/actions";
import styled from "styled-components";

const BodyDiv = styled.div`
  margin: 50px 0;
  padding: 50px;
  padding-bottom: 100px;
  .marketing-permissions-section {
    height: 80vh;
    input[type="checkbox"] {
      width: auto !important;
      height: auto !important;
      -webkit-transform: scale(1.5);
      outline: none;
    }
    label {
      margin-left: 10px;
      margin-top: 0px;
      padding-top: 0px;
      font-size: 20px;
    }
  }
`;

const MarketingPermission = () => {
  const [checkedValue, setCheckedValue] = useState("");

  const initialValues: any = {
    marketingPermission: false,
    checked: checkedValue,
  };

  const user = useSelector((state: any) => state.auth.user);

  const dispatch = useDispatch();

  return (
    <>
      <NavBar />
      <BodyDiv>
        <h1>Marketing permissions</h1>
        <Formik
          initialValues={{ ...initialValues }}
          onSubmit={(values) => {
            const { settings } = user;
            const {
              marketingPermission,
              ...newUserSettings
            } = settings;
            const newValues = {
              ...newUserSettings,
              marketingPermission:
                values.checked.length > 0 &&
                values.checked[0] === "checked"
                  ? true
                  : false,
            };
            dispatch(editUserSettingsAction(newValues));
          }}>
          {({
            errors,
            touched,
            values,
            handleChange,
            handleSubmit,
          }: any) => (
            <div className="marketing-permissions-section">
              <Field
                type="checkbox"
                name="checked"
                value="checked"
                onChange={(e: any) => {
                  setCheckedValue("checked");
                  handleChange(e);
                  handleSubmit();
                }}
              />
              <label>
                By ticking this box, you wish to be
                contacted for marketing information purposes
                or for any special offer
              </label>
            </div>
          )}
        </Formik>
      </BodyDiv>
    </>
  );
};

export default MarketingPermission;
