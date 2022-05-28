import React, { useState } from 'react'

import HeroContainer from './HeroContainer';
import WhyChooseUs from './WhyChooseUs';
import AboutUs from './AboutUs';
import CounterSection from './CounterSection';
import OurSpeciality from './OurSpeciality';
import HowWeWork from './HowWeWork';
import FooterSocialIcon from './SocialIcon';
import Portfolio from './Portfolio';
import SupportedTechnology from './SupportedTechnology';
import OurCustomer from './OurCustomer';

const Home = () => {
    const [activeStep, setActiveStep] = useState(1)

    const stepChange = (stepname: number) => {
        setActiveStep(stepname)
    }

    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Home</p>
            </div>
            <div className="pv-home">
                <div className="bloc-tabs" >
                    <div className="tabs active-tabs" onClick={() => { stepChange(1) }}>
                        <p className={activeStep == 1 ? "sport-name-active" : "sport-name-deactive"} >Hero Container</p>
                    </div>
                    <div className="tabs active-tabs" onClick={() => { stepChange(2) }}>
                        <p className={activeStep == 2 ? "sport-name-active" : "sport-name-deactive"}>Why Choose Us</p>
                    </div>
                    <div className="tabs active-tabs" onClick={() => { stepChange(3) }}>
                        <p className={activeStep == 3 ? "sport-name-active" : "sport-name-deactive"}>About Us</p>
                    </div>
                    <div className="tabs active-tabs" onClick={() => { stepChange(4) }}>
                        <p className={activeStep == 4 ? "sport-name-active" : "sport-name-deactive"}>Counter Section</p>
                    </div>
                    <div className="tabs active-tabs" onClick={() => { stepChange(5) }}>
                        <p className={activeStep == 5 ? "sport-name-active" : "sport-name-deactive"}>Our Speciality</p>
                    </div>
                    <div className="tabs active-tabs" onClick={() => { stepChange(6) }}>
                        <p className={activeStep == 6 ? "sport-name-active" : "sport-name-deactive"}>How We Work</p>
                    </div>
                    <div className="tabs active-tabs" onClick={() => { stepChange(7) }}>
                        <p className={activeStep == 7 ? "sport-name-active" : "sport-name-deactive"}>Footer Section</p>
                    </div>
                    <div className="tabs active-tabs" onClick={() => { stepChange(8) }}>
                        <p className={activeStep == 8 ? "sport-name-active" : "sport-name-deactive"}>HomePage Portfolio</p>
                    </div>
                    <div className="tabs active-tabs" onClick={() => { stepChange(9) }}>
                        <p className={activeStep == 9 ? "sport-name-active" : "sport-name-deactive"}>Supported Technology</p>
                    </div>
                    <div className="tabs active-tabs" onClick={() => { stepChange(10) }}>
                        <p className={activeStep == 10 ? "sport-name-active" : "sport-name-deactive"}>Our Customer</p>
                    </div>
                </div>

                {activeStep == 1 && <HeroContainer></HeroContainer>}
                {activeStep == 2 && <WhyChooseUs></WhyChooseUs>}
                {activeStep == 3 && <AboutUs></AboutUs>}
                {activeStep == 4 && <CounterSection></CounterSection>}
                {activeStep == 5 && <OurSpeciality></OurSpeciality>}
                {activeStep == 6 && <HowWeWork></HowWeWork>}
                {activeStep == 7 && <FooterSocialIcon></FooterSocialIcon>}
                {activeStep == 8 && <Portfolio></Portfolio>}
                {activeStep == 9 && <SupportedTechnology></SupportedTechnology>}
                {activeStep == 10 && <OurCustomer></OurCustomer>}
            </div>

        </div>
    )
}

export default Home
