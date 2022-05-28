import { useEffect } from 'react'
import { Route, Switch, useHistory, Redirect } from 'react-router'
import Auth from '../config/Auth'
import { ApiGet } from '../helper/API/ApiData'
import Layouts from '../layouts/Layouts'
import LogRegLayout from '../layouts/LogRegLayout'
import Blog from './blog/Blog'
import BlogRegistration from './blog/BlogRegistration'
import AddCareerReq from './careerreq/AddCareerReq'
import CareerReq from './careerreq/CareerReq'
import AddCategory from './category/AddCategory'
import Category from './category/Category'
import Dashboard from './dashboard/Dashboard'
import Faq from './faq/Faq'
import Home from './home/Home'
import Login from './Login/Login'
import AddPortfolio from './portfolio/AddPortfolio'
import Portfolio from './portfolio/Portfolio'
import ProjectView from './projectview/ProjectView'
import Setting from './setting/Setting'
import EditTeamMember from './teammember/EditTeamMember'
import TeamMember from './teammember/TeamMember'
import AddTermsCondition from './terms and condition/AddTermsCondition'
import TermsCondition from './terms and condition/TermsCondition'
import Testimonial from './testimonial/Testimonial'
import TestimonialManagement from './testimonial/TestimonialManagement'
import UserManagement from './users/UserManagement'
import UserRegistration from './users/UserRegistration'
import CreateFaq from './faq/CreateFaq';
import Services from './services/services'
import AddService from './services/addService'
import PrivacyPolicy from './privacyPolicy/PrivacyPolicy';
import AllTech from './allTech/allTech'
import AddTech from './allTech/AddTech'
import ServicesDetails from './servicesDetails/ServicesDetails'
import OurClient from './ourClient/OurClient';
import ClientList from './ourClient/ClientList';
import AddClient from './ourClient/AddClient';

const Index = () => {
    const history = useHistory();

    useEffect(() => {
        if (Auth.isUserAuthenticated()) {
            ApiGet('admin/validate')
                .then((res) => {
                    // history.push("/dashboard");
                })
                .catch((error) => {
                    history.push("/")
                })
        } else {
            history.push("/");
        }
    }, [])

    return (
        <>
            <Switch>
                <RouteWrapper exact={true} path="/projectreq" component={ProjectView} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/home" component={Home} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/category_list" component={Category} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/tech_list" component={AllTech} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/add_tech" component={AddTech} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/add_category" component={AddCategory} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/blog" component={Blog} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/blog_registration" component={BlogRegistration} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/users_list" component={UserManagement} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/user" component={UserRegistration} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/portfolio" component={Portfolio} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/add_portfolio" component={AddPortfolio} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/teammembers" component={TeamMember} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/editteammember" component={EditTeamMember} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/careereq" component={CareerReq} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/addcareerreq" component={AddCareerReq} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/setting" component={Setting} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/faq" component={Faq} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/create_faq" component={CreateFaq} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/terms" component={TermsCondition} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/policy" component={PrivacyPolicy} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/addtermscondition" component={AddTermsCondition} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/testimonial" component={Testimonial} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/testimonial_registration" component={TestimonialManagement} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/services" component={Services} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/servicesDetail" component={ServicesDetails} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/add_services" component={AddService} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/client" component={OurClient} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/clientList" component={ClientList} layout={Layouts} isPrivateRoute={true} />
                <RouteWrapper exact={true} path="/add_client" component={AddClient} layout={Layouts} isPrivateRoute={true} />

                {Auth.isUserAuthenticated() ?
                    <div>
                        <RouteWrapper exact={true} path="/" component={Dashboard} layout={Layouts} isPrivateRoute={true} />
                    </div>
                    :
                    <RouteWrapper exact={true} path="/" component={Login} layout={LogRegLayout} isPrivateRoute={false} />
                }

                <Redirect from="*" to="/" />
            </Switch>

        </>
    )
}

export default Index;

interface RouteWrapperProps {
    component: any;
    layout: any;
    exact: boolean;
    path: string;
    isPrivateRoute: boolean;
}

function RouteWrapper({
    component: Component,
    layout: Layout,
    isPrivateRoute,
    ...rest
}: RouteWrapperProps) {

    const isAuthenticated: boolean = isPrivateRoute ? Auth.isUserAuthenticated() : true;
    return (
        <>
            {isAuthenticated ?
                (
                    <Route {...rest} render={(props) =>
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    } />
                )
                : null
            }
        </>
    );
}