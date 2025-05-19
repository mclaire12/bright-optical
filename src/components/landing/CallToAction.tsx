
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Eyecare Experience?</h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Join thousands of Rwandans who are getting their eyecare products delivered to their doorstep.
          Sign up today and receive special offers on your first order!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Create an Account</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
            <Link to="/pharmacies">Partner with Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
