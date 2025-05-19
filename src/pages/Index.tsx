
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import PartnersSection from "@/components/landing/PartnersSection";
import CallToAction from "@/components/landing/CallToAction";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <PartnersSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
