import keychain from "../assets/paid/key.jpg";
import bagpack from "../assets/paid/bag.jpg";
import calender from "../assets/paid/calender.jpg";
import mousepad from "../assets/paid/mousepad.jpg";
import notebook from "../assets/paid/Notebook.jpg";
import pen from "../assets/paid/pen.jpg";
import gstposter from "../assets/Free/gstposter.jpg";
import freelancing from "../assets/Free/freelancing.jpg";
import jobposting from "../assets/Free/jobposting.jpg";
import joinus from "../assets/Free/joinus.jpg";

export const categories = [
  { id: "stationery", name: "Stationery" },
  { id: "promotional", name: "Promotional Items" },
  { id: "office-supplies", name: "Office Supplies" },
  { id: "marketing", name: "Marketing Materials" },
  { id: "tech-accessories", name: "Tech Accessories" },
  { id: "company-assets", name: "Company Assets" },
];

export const products = [
  // Stationery
  {
    id: 1,
    name: "Keychain",
    description: "Professional Keychian with custom engraving",
    price: 249.00,
    originalPrice: 399.00,
    image: keychain,
    category: "office-supplies",
    rating: 4.8,
    customizable: false,
    tag: "Popular"
  },
  {
    id: 2,
    name: "Bag Pack",
    description: "Smart. Sleek. Durable. Professional. Branded.",
    price: 799.00,
    originalPrice: 1099.00,
    image: bagpack,
    category: "company-assets",
    rating: 4.6,
    customizable: false,
    // tag: "Trendy"
  },
  {
    id: 3,
    name: "Calender",
    description: "Colorful Calender with custom design. Perfect for office or home.",
    price: 149.00,
    originalPrice: 199.00,
    image: calender,
    category: "promotional",
    rating: 4.4,
    customizable: false,
  },
  {
    id: 4,
    name: "Mouse Pad",
    description: "High-quality Mouse Pad with professional graphics",
    price: 199.00,
    image: mousepad,
    category: "tech-accessories",
    rating: 4.7,
    customizable: false,
  },

  // // Promotional Items
  {
    id: 5,
    name: "Office Kit",
    description: "Bottle, Pen, and Notebook set with professional Educerns branding",
    price: 399.00,
    originalPrice: 499.00,
    image: notebook,
    category: "office-supplies",
    rating: 4.9,
    customizable: false,
    tag: "Best Seller"
  },
  {
    id: 6,
    name: "Pen ",
    description: "Premium ballpoint pen from Educern with sleek design",
    price: 99.00,
    originalPrice: 149.00,
    image: pen,
    category: "stationery",
    rating: 4.5,
    customizable: false,
  },
  // {
  //   id: 7,
  //   name: "Custom Keychains",
  //   description: "Durable metal keychains with laser engraving",
  //   price: 6.99,
  //   image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  //   category: "promotional",
  //   rating: 4.3,
  //   customizable: true,
  // },
  // {
  //   id: 8,
  //   name: "Logo Badges",
  //   description: "Professional name badges with magnetic backing",
  //   price: 9.99,
  //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  //   category: "promotional",
  //   rating: 4.6,
  //   customizable: true,
  // },

  // // Office Supplies
  // {
  //   id: 9,
  //   name: "Business Cards",
  //   description: "Premium business cards with glossy finish",
  //   price: 29.99,
  //   image: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=400",
  //   category: "office-supplies",
  //   rating: 4.8,
  //   customizable: true,
  //   tag: "Professional"
  // },
  // {
  //   id: 10,
  //   name: "Letterhead Paper",
  //   description: "High-quality letterhead with company branding",
  //   price: 22.99,
  //   image: "https://images.unsplash.com/photo-1586953208445-d3e35129b2b?w=400",
  //   category: "office-supplies",
  //   rating: 4.7,
  //   customizable: true,
  // },
  // {
  //   id: 11,
  //   name: "Custom Envelopes",
  //   description: "Professional envelopes with return address",
  //   price: 16.99,
  //   image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400",
  //   category: "office-supplies",
  //   rating: 4.5,
  //   customizable: true,
  // },

  // // Marketing Materials
  // {
  //   id: 12,
  //   name: "Company Brochures",
  //   description: "Tri-fold brochures with professional design",
  //   price: 34.99,
  //   image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
  //   category: "marketing",
  //   rating: 4.6,
  //   customizable: true,
  // },
  // {
  //   id: 13,
  //   name: "Promotional Flyers",
  //   description: "Eye-catching flyers for events and promotions",
  //   price: 19.99,
  //   image: "https://images.unsplash.com/photo-1561070791-36fa28e796c4?w=400",
  //   category: "marketing",
  //   rating: 4.4,
  //   customizable: true,
  // },
  // {
  //   id: 14,
  //   name: "Banner Stands",
  //   description: "Retractable banner stands for trade shows",
  //   price: 89.99,
  //   image: "https://images.unsplash.com/photo-1541544181051-e46607d22e50?w=400",
  //   category: "marketing",
  //   rating: 4.8,
  //   customizable: true,
  // },

  // // Tech Accessories
  // {
  //   id: 15,
  //   name: "Custom USB Drives",
  //   description: "16GB USB drives with logo engraving",
  //   price: 21.99,
  //   image: "https://images.unsplash.com/photo-1628508751758-be96b7c609c8?w=400",
  //   category: "tech-accessories",
  //   rating: 4.7,
  //   customizable: true,
  // },
  // {
  //   id: 16,
  //   name: "Branded Mouse Pads",
  //   description: "Non-slip mouse pads with custom graphics",
  //   price: 11.99,
  //   image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
  //   category: "tech-accessories",
  //   rating: 4.5,
  //   customizable: true,
  // },
  // {
  //   id: 17,
  //   name: "Phone Holders",
  //   description: "Adjustable phone stands with company branding",
  //   price: 13.99,
  //   image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400",
  //   category: "tech-accessories",
  //   rating: 4.6,
  //   customizable: true,
  // },

  // // Company Assets (Pre-branded Educern products)
  // {
  //   id: 18,
  //   name: "Educern Premium Notebook",
  //   description: "Official Educern-branded leather notebook",
  //   price: 39.99,
  //   image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
  //   category: "company-assets",
  //   rating: 4.9,
  //   customizable: false,
  //   tag: "Official"
  // },
  // {
  //   id: 19,
  //   name: "Educern Coffee Mug",
  //   description: "Official ceramic mug with Educern logo",
  //   price: 19.99,
  //   image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400",
  //   category: "company-assets",
  //   rating: 4.8,
  //   customizable: false,
  //   tag: "Official"
  // },
  // {
  //   id: 20,
  //   name: "Educern Polo Shirt",
  //   description: "Professional polo shirt with embroidered logo",
  //   price: 45.99,
  //   image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  //   category: "company-assets",
  //   rating: 4.7,
  //   customizable: false,
  //   tag: "Official"
  // },
  // {
  //   id: 21,
  //   name: "Educern Business Cards",
  //   description: "Premium business cards with Educern branding",
  //   price: 49.99,
  //   image: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=400",
  //   category: "company-assets",
  //   rating: 4.8,
  //   customizable: false,
  //   tag: "Official"
  // },
  // {
  //   id: 22,
  //   name: "Educern Tote Bag",
  //   description: "Eco-friendly canvas tote with company logo",
  //   price: 24.99,
  //   image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  //   category: "company-assets",
  //   rating: 4.6,
  //   customizable: false,
  //   tag: "Official"
  // },
];

export const templates = [
  {
    id: 1,
    name: "Poster for GST Consultant",
    description: "Professional poster template for GST consultants",
    image: gstposter,
    downloadUrl: "/templates/business-flyer.pdf",
    category: "marketing"
  },
  {
    id: 2,
    name: "Freelancing Event Poster",
    description: "Promotional poster template for freelancing events",
    image: freelancing,
    downloadUrl: "/templates/event-poster.pdf",
    category: "marketing"
  },
  {
    id: 3,
    name: "Job Posting Template",
    description: "Professional job posting template for hiring",
    image: jobposting,
    downloadUrl: "/templates/social-media-kit.zip",
    category: "digital"
  },
  {
    id: 4,
    name: "Join Our Team Newsletter",
    description: "Monthly newsletter template for team updates",
    image: joinus,
    downloadUrl: "/templates/newsletter.pdf",
    category: "marketing"
  },
  // {
  //   id: 5,
  //   name: "Invoice Template",
  //   description: "Clean and professional invoice template",
  //   image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
  //   downloadUrl: "/templates/invoice.pdf",
  //   category: "business"
  // },
  // {
  //   id: 6,
  //   name: "Presentation Template",
  //   description: "Modern PowerPoint presentation template",
  //   image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
  //   downloadUrl: "/templates/presentation.pptx",
  //   category: "business"
  // },
  // {
  //   id: 7,
  //   name: "Brochure Template",
  //   description: "Tri-fold brochure template for services",
  //   image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
  //   downloadUrl: "/templates/brochure.pdf",
  //   category: "marketing"
  // },
  // {
  //   id: 8,
  //   name: "Logo Design Kit",
  //   description: "Logo templates and design elements",
  //   image: "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=400",
  //   downloadUrl: "/templates/logo-kit.zip",
  //   category: "branding"
  // }
];
