import { Field, Form, Formik } from 'formik';
import { resetPasswordAction } from '../../../redux/actions/actions';
import { ResetEmailValidator } from '../../../util/form-validators';
import FormButton from '../form-button/FormButton';
import { paths } from '../../../util/paths';
import Div from './ForgotPasswordModal.css'

const ForgotPasswordModal = (props: any) => {
    let {show, setShow} = props;
    
    // const handleSendLink = useCallback(() => history.push('/email/password-reset'), [history]);

    const handleCloseModal = () => {
        setShow(false);
    }
    const initialValues: any = {
        username: "",
    }

    return (
        
        <Div className={show ? 'show' : 'hide'}>
            <div>
                <div className="heading">Forgot Password?</div>
                <div className="content">Don’t worry, resetting your password is easy. Please enter the email address you registered with, you will be sent a link to reset your password.</div>
                <Formik
                        initialValues={{...initialValues}}
                        validationSchema={ResetEmailValidator}
                        onSubmit={values => {
                            resetPasswordAction(values, "email")
                        }}>
                        {
                            ({errors, touched, values}: any) => (
                                <Form className={`form ${(touched.username && errors.username) ? 'form-error': ''}`}>
                                    <div>
                                        <Field name="username" type="text" placeholder="Your email address"/> 
                                        {(touched.username && errors.username) && <div className="form-error-message">{errors.username}</div>}
                                    </div>
                                    <span></span> 
                                    <FormButton label="Send Link" formName={paths.RESET_PASSWORD} /> 
                                </Form>
                            )
                        }
                </Formik>
                <div className="footer">Remember your password? <span onClick={handleCloseModal}>Try Logging in</span></div>
            </div>
        </Div>
    )
}

export default ForgotPasswordModal;
