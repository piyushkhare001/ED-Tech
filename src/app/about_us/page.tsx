'use client'
import ContactformSection from "@/components/frontend/ContactFormSection"
import Footer from "@/components/frontend/footer"
import LearningGrid from "@/components/frontend/LearningGrid"
import Quote from "@/components/frontend/Quote"


import Stats from "@/components/frontend/Stats"

  const AboutUs = () => {
    return((
        <div>
             <ContactformSection/>
             <Quote/>
             <LearningGrid/>
             <Stats/>
             <Footer/>

        </div>
        
    ))

}

export default AboutUs