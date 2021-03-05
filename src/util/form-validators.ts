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

export const RecipientValidator = Yup.object().shape({
    firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
    lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
    mobile: Yup.string().min(7, "Too short").max(15, "Too long").required("Required"),
    phoneCode: Yup.string().min(1, "Too short").max(5, "Too long").required("Required"),
    email: Yup.string().required("Required").email("Enter valid email").required("Required"),
    state: Yup.string().min(3, "Too short").max(25, "Too long").required("Required"),
    reason: Yup.string(),
    bankName: Yup.string().min(2, "Too short").max(100, "Too long").required("Required"),
    accountNumber: Yup.string().min(5, "Too short").max(15, "Too long").required("Required"),
 });


 export const NewPaymentCardValidator = Yup.object().shape({
  cardHolder: Yup.string().min(3, "Too short").required("Required"),
  cardNumber: Yup.number().min(1000000000000000, "Invalid card number").max(9999999999999999, "Invalid card number").required("Required"),
  expiryDate: Yup.string().min(5, "Too short").max(5, "Too long").required("Required"),
  cvv: Yup.string().min(3, "Too short").max(3, "Too long").required("Required"),
});