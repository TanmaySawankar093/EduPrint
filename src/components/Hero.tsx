
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-200">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">Professional Business Solutions</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Custom Business
                <span className="text-blue-300 block">Stationery & Assets</span>
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Order personalized stationery, promotional materials, and business assets for your organization. 
                Professional quality with custom branding options.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-300 text-blue-100 hover:bg-blue-800/50 font-semibold px-8 py-3 rounded-lg"
              >
                View Templates
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-200">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-blue-200">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-blue-200">Support</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600"
              alt="Professional workspace with laptop and stationery"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <div className="text-gray-800 font-semibold">Featured: Custom Business Cards</div>
              <div className="text-gray-600 text-sm">Starting from $29.99</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
