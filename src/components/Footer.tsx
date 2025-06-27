
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    "Products": [
      "Stationery",
      "Office Supplies",
      "Promotional Items",
      "Business Cards",
      "Custom Design"
    ],
    "Services": [
      "Free Templates",
      "Custom Design",
      "Bulk Orders",
      "Corporate Solutions",
      "Design Consultation"
    ],
    "Support": [
      "Help Center",
      "Order Tracking",
      "Returns & Exchanges",
      "Shipping Info",
      "Contact Us"
    ],
    "Company": [
      "About Eduprint",
      "Educern Organization",
      "Careers",
      "Press",
      "Privacy Policy"
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Eduprint</h3>
              <p className="text-gray-400 mb-4">
                Professional business stationery and promotional materials for the modern workplace. 
                Part of the Educern Organization.
              </p>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>support@educerns.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>180 1234 123</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>Street 23, Thane, Mumbai, Maharashtra, IN 423562</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <div key={index} className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            © 2025 Eduprint by Educerns Technologies. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="/" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
