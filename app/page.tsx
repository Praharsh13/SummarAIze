import { Button } from '@/components/ui/button'
import React from 'react'
import HeroSection from '@/components/landing-page/heroSection'
import DemoSection from '@/components/landing-page/Demo'
import WorkDemo from '@/components/landing-page/Howitwork'
import Pricing from '@/components/landing-page/Pricing'
import CTASection from '@/components/landing-page/CTASection'

const page = () => {
  return (
<>

{/* Hero Page */}
   <HeroSection/>
{/* Demo Page */}   
   <DemoSection/>
{/* How it work Page */}
   <WorkDemo/>    
{/* Price Page */}
   <Pricing/>  
{/* CTA Page */}   
   <CTASection/>

  
</>
)
}

export default page