import React, { useState } from "react";
import NavBar from "components/modules/navbar/NavBar";
import { Field, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editUserSettingsAction } from "redux/actions/actions";
import styled from "styled-components";
import BodyDiv from './UserSettings.css'
import FancyToggle from "components/modules/fancy-toggle/FancyToggle";
import FormButton from "components/modules/form-button/FormButton";

const UserSettings = () => {

  const user = useSelector((state: any) => state.auth.user);

  const [marketingPermissionsStatus, setMarketingPermissionsStatus] = useState(Boolean(user?.settings?.marketingPermissions))
  const initialValues: any = {
    marketingPermissions: marketingPermissionsStatus,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      editUserSettingsAction(values, (userData: any) => {
        setMarketingPermissionsStatus(userData.settings.marketingPermissions);
      });
    }}
  )

  const turnOffAllNotifications = () => {
    const values = {
      marketingPermissions: false
    }
    editUserSettingsAction(values, (userData: any) => {
      setMarketingPermissionsStatus(userData.settings.marketingPermissions);
    });
  }

  return (
    <>
      <NavBar />
      <BodyDiv>
        <h2>User settings</h2>
        <form onSubmit={formik.handleSubmit}>

            <div className="settings-row">
                <label className="label">
                  <div>            
                    <h4>
                      Marketing permissions
                      <br />
                      <small>
                        By ticking this box, you wish to be
                        contacted for marketing information purposes
                        or for any special offer
                    </small>
                    </h4>
                                        
                  </div>


                  <FancyToggle 
                    label={marketingPermissionsStatus ? 'ON' : 'OFF'} 
                    name="marketingPermissions"
                    // value={formik.values.marketingPermissions}
                    isActive={marketingPermissionsStatus}
                    onChange={(e) => {
                      formik.handleChange(e)
                      formik.submitForm()
                    }} 
                  />
                </label>


            </div>     



            <div className="settings-row">
                <label className="label">
                  <div>            
                    <h4>
                      Transaction & Account updates
                      <br />
                      <small>
                        Always on
                    </small>
                    </h4>
                                        
                  </div>


                  <FancyToggle 
                    label={'Always ON'} 
                    name="transactionUpdates"
                    // value={formik.values.marketingPermissions}
                    isActive={true}
                    disabled
                  />
                </label>
            </div>       

            
        </form>

        <button className="big-button" onClick={turnOffAllNotifications}>
            Turn it all off
        </button>

      </BodyDiv>
    </>
  );
};

export default UserSettings;
