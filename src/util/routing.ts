import LandingPage from "../components/pages/landing-page/LandingPage";
import SignIn from "../components/pages/sign-in/SignIn";

interface IRoute {
    path: string,
    component: (props: any) => JSX.Element,
    protected?: boolean,
    props?: any

}
export const Routing: IRoute[] = [
    {
        'path': '/',
        'component': LandingPage,
        'protected': false,
        'props': {location: 'london'}
    }
]