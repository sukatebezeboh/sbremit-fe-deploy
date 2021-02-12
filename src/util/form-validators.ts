import * as Yup from 'yup';

export const SignUpValidator = Yup.object().shape({
    firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
    lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
    location_country: Yup.string().min(2, "Too short").max(2, "Too long").required("Required"),
    username: Yup.string().required("Required").email("Enter valid email"),
    password: Yup.string().min(8, "Minimum password length is 8 characters").max(20, "Max password length is 20 characters").required("Required")
});

export const SignInValidator = Yup.object().shape({
    username: Yup.string().required("Required").email("Enter valid email"),
    password: Yup.string().min(8, "Minimum password length is 8 characters").max(20, "Max password length is 20 characters").required("Required")
});

export const ChangePasswordValidator = Yup.object().shape({
    oldPassword: Yup.string().min(8, "Minimum password length is 8 characters").max(20, "Max password length is 20 characters").required("Required"),
    password: Yup.string().min(8, "Minimum password length is 8 characters").max(20, "Max password length is 20 characters").required("Required"),
    confirmation: Yup.string().min(8, "Minimum password length is 8 characters").max(20, "Max password length is 20 characters").required("Required").when("password", {
        is: (val: any)=> (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        )
      })
});

export const ResetPasswordValidator = Yup.object().shape({
    password: Yup.string().min(8, "Minimum password length is 8 characters").max(20, "Max password length is 20 characters").required("Required"),
    confirmation: Yup.string().min(8, "Minimum password length is 8 characters").max(20, "Max password length is 20 characters").required("Required").when("password", {
        is: (val: any)=> (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        )
      })
});
export const ResetEmailValidator = Yup.object().shape({
    username: Yup.string().required("Required").email("Enter valid email"),
});
