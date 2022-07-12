import * as Yup from 'yup';

export const SignUpValidator = Yup.object().shape({
    firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
    lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
    location_country: Yup.string().min(2, "Too short").max(2, "Too long").required("Required"),
    username: Yup.string().trim()
      .test('test-username', 'Enter Valid Phone/Email', 
        (value) => {
          const emailRegex = /^([a-zA-Z0-9_\\.-]+)([\+][a-zA-Z0-9_\\.-]+)*@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

          const phoneRegex = /^\+?\d{7,}$/;
          let isValidEmail = value ? emailRegex.test(value) : false;
          let isValidPhone = value ? phoneRegex.test(value) : false;
          if (!isValidEmail && !isValidPhone ){
            return false;
          }
          return true;
      }),
    password: Yup.string().min(8, "Minimum password length is 8 characters").max(20, "Max password length is 20 characters").required("Required"),
});

export const SignInValidator = Yup.object().shape({
    username: Yup.string().trim()
      .test('test-username', 'Enter Valid Phone/Email', 
        (value) => {
          const emailRegex = /^([a-zA-Z0-9_\\.-]+)([\+][a-zA-Z0-9_\\.-]+)*@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

          const phoneRegex = /^\+?\d{7,}$/;
          let isValidEmail = value ? emailRegex.test(value) : false;
          let isValidPhone = value ? phoneRegex.test(value) : false;
          if (!isValidEmail && !isValidPhone ){
            return false;
          }
          return true;
      }),
    password: Yup.string().min(8, "Minimum password length is 8 characters").max(20, "Max password length is 20 characters").required("Required"),
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

export const InviteUserValidator = Yup.object().shape({
  email: Yup.string().required("Required").email("Enter valid email"),
});

export const RecipientValidator = Yup.object().shape({
    firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
    lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
    mobile: Yup.string().required("Required").when(['phoneCode'], (phoneCode, schema) =>  {
      return phoneCode === '+237' ? schema.matches(/^\d{9}$/, 'phone number should be 9 digits') : schema.matches(/^\d{7,15}$/, 'should be between 7 and 15 digits')
    }),
    phoneCode: Yup.string().min(1, "Too short").max(5, "Too long").required("Required"),
    email: Yup.string().email("Enter valid email"),
    state: Yup.string().min(3, "Too short").max(25, "Too long"),
    reason: Yup.string(),
    bankName: Yup.string().required("Required"),
    bankCode: Yup.string().matches(/^(\s)*[0-9]{5}(\s)*$/, 'The bank code provided is not correct. A sample bank code looks like:10005').required("bank code is required"),
    branchCode: Yup.string().matches(/^(\s)*[0-9]{5}(\s)*$/, 'The branch code provided is not correct. A sample branch code looks like:00001').required("branch code is required"),
    accountNumber: Yup.string().matches(/^(\s)*[0-9]{11}(\s)*$/, 'The account number provided is not correct. A sample account number looks like:01234567890').required("account number is required"),
    recipientAccountNumber: Yup.string().required("The account number is required"),
    accountBranch: Yup.string().required("The account branch is required"),
    key: Yup.string().matches(/^(\s)*[0-9]{2}(\s)*$/, 'The key code provided is not correct. A sample key code  looks like:12').required("Key is required"),
 });

 export const RecipientBankTransferBankTransferValidator = Yup.object().shape({
  firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  mobile: Yup.string().required("Required").when(['phoneCode'], (phoneCode, schema) =>  {
    return phoneCode === '+237' ? schema.matches(/^\d{9}$/, 'phone number should be 9 digits') : schema.matches(/^\d{7,15}$/, 'should be between 7 and 15 digits')
  }),
  phoneCode: Yup.string().min(1, "Too short").max(5, "Too long").required("Required"),
  email: Yup.string().email("Enter valid email"),
  state: Yup.string().min(3, "Too short").max(25, "Too long"),
  reason: Yup.string(),
  bankName: Yup.string().required("Required"),
  bankCode: Yup.string().matches(/^(\s)*[0-9]{5}(\s)*$/, 'The bank code provided is not correct. A sample bank code looks like:10005').required("bank code is required"),
  branchCode: Yup.string().matches(/^(\s)*[0-9]{5}(\s)*$/, 'The branch code provided is not correct. A sample branch code looks like:00001').required("branch code is required"),
  accountNumber: Yup.string().matches(/^(\s)*[0-9]{11}(\s)*$/, 'The account number provided is not correct. A sample account number looks like:01234567890').required("account number is required"),
  key: Yup.string().matches(/^(\s)*[0-9]{2}(\s)*$/, 'The key code provided is not correct. A sample key code  looks like:12').required("Key is required"),
});

export const RecipientBankTransferMicrofinanceTransferValidator = Yup.object().shape({
  firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  mobile: Yup.string().required("Required").when(['phoneCode'], (phoneCode, schema) =>  {
    return phoneCode === '+237' ? schema.matches(/^\d{9}$/, 'phone number should be 9 digits') : schema.matches(/^\d{7,15}$/, 'should be between 7 and 15 digits')
  }),
  phoneCode: Yup.string().min(1, "Too short").max(5, "Too long").required("Required"),
  email: Yup.string().email("Enter valid email"),
  state: Yup.string().min(3, "Too short").max(25, "Too long"),
  reason: Yup.string(),
  recipientAccountNumber: Yup.string().required("The account number is required"),
  accountBranch: Yup.string().required("The account branch is required"),
});


export const RecipientCashPickupValidator = Yup.object().shape({
  firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  mobile: Yup.string().required("Required").when(['phoneCode'], (phoneCode, schema) =>  {
    return phoneCode === '+237' ? schema.matches(/^\d{9}$/, 'phone number should be 9 digits') : schema.matches(/^\d{7,15}$/, 'should be between 7 and 15 digits')
  }),
  phoneCode: Yup.string().min(1, "Too short").max(5, "Too long").required("Required"),
  email: Yup.string().email("Enter valid email"),
  state: Yup.string().min(3, "Too short").max(25, "Too long"),
  reason: Yup.string(),
  pickupPoint: Yup.string().required("Required")
});

export const RecipientMobileMoneyValidator = Yup.object().shape({
  firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  // mobile: Yup.string().min(7, "Too short").max(15, "Too long").required("Required"),
  mobile: Yup.string().required("Required").when(['phoneCode'], (phoneCode, schema) =>  {
    return phoneCode === '+237' ? schema.matches(/^\d{9}$/, 'phone number should be 9 digits') : schema.matches(/^\d{7,15}$/, 'should be between 7 and 15 digits')
  }),
  phoneCode: Yup.string().min(1, "Too short").max(5, "Too long").required("Required"),
  confirmPhoneCode: Yup.string().required("Required").oneOf([Yup.ref('phoneCode')], 'Phone codes does not match'),
  confirmMobile: Yup.string().required("Required").oneOf([Yup.ref('mobile')], 'Numbers do not match, please update'),
  mobileMoneyProvider: Yup.string(),
  email: Yup.string().email("Enter valid email"),
  state: Yup.string().min(3, "Too short").max(25, "Too long"),
  reason: Yup.string()
});


 export const NewPaymentCardValidator = Yup.object().shape({
  cardHolder: Yup.string().min(3, "Too short").required("Required"),
  cardNumber: Yup.number().min(1000000000000000, "Invalid card number").max(9999999999999999, "Invalid card number").required("Required"),
  expiryDate: Yup.string().min(5, "Too short").max(5, "Too long").required("Required"),
  cvv: Yup.string().min(3, "Too short").max(3, "Too long").required("Required"),
});

export const EditProfileValidator = Yup.object().shape({
  firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  mobile: Yup.string().min(7, "Too short").max(15, "Too long").required("Required"),
  state: Yup.string().min(3, "Too short").max(25, "Too long"),
  day: Yup.number().min(1, "Input day").max(31, "Input day"),
  month: Yup.number().min(1, "Input month").max(12, "Input month"),
  year: Yup.number().min(1900, "Input month").max((new Date()).getFullYear(), "Input month"),
});

export const userVerificationValidator = Yup.object().shape({
  firstName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  lastName: Yup.string().min(2, "Too short").max(30, "Too long").required("Required"),
  mobile: Yup.string().min(7, "Too short").max(15, "Too long").required("Required"),
  gender: Yup.string().required("Required"),
  day: Yup.number().min(1, "Input day").max(31, "Input day").required(),
  month: Yup.number().min(1, "Input month").max(12, "Input month").required(),
  year: Yup.number().min(1900, "Input month").max((new Date()).getFullYear(), "Input month").required(),
  buildingNumber: Yup.string().max(10, "Too long").required("Required"),
  streetName: Yup.string().min(3, "Too long").max(250, "Too long").required("Required"),
});