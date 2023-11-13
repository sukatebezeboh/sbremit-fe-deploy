# Frontend Documentation for SBremit Website

## 1. Overview
### Introduction
# SB Remit Website Goal

**Empowering Seamless Money Transfers to Africa**

SB Remit is dedicated to providing a reliable and affordable money transfer solution for individuals in the UK and Canada sending money to Africa. Our goal is to ensure a transparent, quick, and secure experience, allowing users to send funds confidently for family support or investment opportunities.

## Objectives:

1. **Affordability:** Eliminate hidden fees, providing a cost-effective option for money transfers to Africa.

2. **Ease of Use:** Simplify the process with a user-friendly platform, catering to both individual and investment needs.

3. **Speed and Reliability:** Ensure prompt and secure fund transfers to recipients.

4. **Trust and Transparency:** Build trust through transparent exchange rates and clear communication.

5. **Customized Solutions:** Tailor money transfer methods for flexibility and convenience.

SB Remit strives to be the trusted financial bridge, making cross-border transactions seamless for users and recipients.



### Technology Stack
- Frontend Framework: [React](https://reactjs.org/)
- State Management: [Redux](https://redux.js.org/)
- Routing: [React Router](https://reactrouter.com/)

## 2. Architecture
### Component Responsibilities and Structure Overview

## App Component
- Initializes the application.
- Renders the `AppLayout` which manages the layout structure for authenticated pages..

## State Management
- Utilizes `Redux` for global communication and state management.

## Communication and Data Passing
- Uses `Params` and `Props` for modal communication and passing data between pages.

## Styling
- Implements styling with the `Styled Components library`.

## Reusable Components
- Mjaorly `Ant design Components`
- `getFlagURL`
- `Countries`
- `getCurrentPathName`
- The rest of these can be found in `/transactions-flow/utils/reusableUtils.ts`

## Major Dependencies
- Components: [Ant Design components](https://ant.design/components).
- Styling: [Styled Components](https://styled-components.com/docs).

## Endpoints Definition File
- This can be found in `/src/util/endpoints.ts`.

## 3. Project Structure
### Directory Structure
- Each page is within a folder that contains at least two files: `PageComponents.tsx` and `PageComponentsStyles.ts`. For heavy task pages, we include a `PageComponentControl/` directory. The `PageComponentControl` contains modular components that are reused in `PageComponents.tsx`. These modular components are specifically designed to handle heavy tasks and are organized under the `PageComponentControl` subdirectory.
- Global reuable components for authenticated transcations flow like Navbar, Asidebar, searchbar, Buttond and others can be found in `/app-layout/transactions-flow/components`.

### Key Files
- Base: `App.tsx`
- Secondary base for auth pages `AppLayout.tsx`.
- Route configuration: `routes.ts` and `RouterConfig.tsx`

### Styles and Theming
- Break ponits `/transactions-flow/utils/`.
- Colors `/transactions-flow/utils/`.
- AntdConfigSettings `/transactions-flow/utils/`.

## 4. Data Fetching
### API Integration
The http configuration can be found in `src/utils/https`. This act as a base to all server request requests. 
`src/env` contains the environment configurations.

## 5. Authentication and Authorization
### User Authentication
- User Credentials: Users provide unique credentials, usually a combination of username and password.
- DOB as a Compulsory Field during Sign-Up: Date of Birth is made compulsory during sign-up for additional verification.
- Two-Factor Authentication (2FA) during Sign-Up: Implemented for enhanced security during the sign-up process. Users receive a secondary verification link via emial after entering primary credentials.

### Authorization
- Verified users have the authorization to make complete transactions without additional restrictions
- New users are restricted and can make only one complete transaction. However, this functionality is currently (Disabled).
- Unverified users must complete the verification process before being authorized to make complete transactions.
- Users are restricted in the number of transfers they can make to the same recipient within a 24-hour period. The limit is set to three transactions (Backend Control).

## 6. Version Control
### Git Workflow
- Developers work on feature branches derived from develop.
- Pull requests are made to merge features back into develop.

### Testing Workflow:
- uat branch is used for user acceptance testing.
- Bug fixes are merged into develop and then into uat for testing.

### Production Release Workflow:
- Changes are merged into master by CTO only after thorough testing on develop and uat.
- Version tags are created for releases.

## 7. Documentation
### Inline Comments
- Use comments to clarify complex logic or components that may not be immediately obvious to other developers.
- Explain the "why" behind the code to provide context for future maintainers.

### Well-Chosen Names:
- Choose meaningful and descriptive names for variables, functions, and components.
- A well-named component or module should convey its purpose without the need for extensive comments.
- Names should clearly communicate the intended functionality or role of a component.
