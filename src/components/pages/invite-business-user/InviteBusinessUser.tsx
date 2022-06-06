import NavBar from 'components/modules/navbar/NavBar'
import { useFormik } from 'formik'
import React from 'react'
import { inviteBusinessUser } from 'redux/actions/actions'
import styled from 'styled-components'
import { InviteUserValidator } from 'util/form-validators'

const PageContainer = styled.div`
    .page-content {
        .form-container {
            padding: 50px 0 150px;
            .form {
                text-align: center;
                h2 {
                    color: grey;
                }

                .input-div {
                    max-width: 500px;
                    margin: 20px auto;
                    .invite-input {
                        width: 100%;
                        padding: 10px 30px;
                        border: 1px solid #007B5D;
                        border-radius: 5px;
                        margin: 5px 0;
                    }
                    small {
                        text-align: right;
                    }
                }

                .invite-btn {
                    background: #007B5D;
                    border: 1px solid #007B5D;
                    color: white;
                    padding: 10px 30px;
                    font-size: 18px;
                    border-radius: 5px;
                    cursor: pointer;
                    &:active {
                        opacity: 0.8;
                    }
                }

            }
        }
    }

`

const InviteBusinessUser = () => {
    const formik = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: InviteUserValidator,
        onSubmit: (values) => {
            inviteBusinessUser(values)
        }
    } );

    const {touched, errors, values } = formik;

  return (
    <PageContainer>
        <NavBar />

        <div className='page-content'>
            <div className="form-container">
                    <form className="form" onSubmit={formik.handleSubmit} >

                        <h2>Invite your user</h2>

                        <div className="input-div">
                            <input 
                                type="email" 
                                name="email"
                                className='invite-input' 
                                placeholder='Input user email here' 
                                onChange={formik.handleChange}
                                value={values.email}
                            />

                            {touched.email && errors.email && <small className="red-txt d-block"> {errors.email} </small>}
                        </div>

                        <button 
                        className='invite-btn'>Invite</button>

                    </form>
            </div>
        </div>

    </PageContainer>
  )
}

export default InviteBusinessUser