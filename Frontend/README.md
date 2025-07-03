# Eduprint 

A modern, full-featured eCommerce platform for customizable business stationery, promotional materials, and corporate assets built with React, TypeScript, and Tailwind CSS. Developed by **EduCerns**, a leading provider of professional business solutions.

## 🚀 Features

### Core E-commerce Functionality
- **Product Catalog**: Browse through 100+ business stationery items
- **Advanced Search & Filtering**: Filter by category, price range, and search terms
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **User Authentication**: Secure login/signup system with localStorage persistence
- **Order Management**: Complete checkout process with order history tracking

### Product Customization
- **Real-time Customization**: Customize products with text, fonts, colors, and positioning
- **Live Preview**: See changes in real-time before adding to cart
- **Custom Branding**: Add your company logo and branding to products
- **Dual Product Types**: Both customizable and pre-branded company assets

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional UI**: Clean, modern interface built with shadcn/ui components
- **Free Templates**: Download promotional templates and resources
- **Order Tracking**: Track order status and download invoices
- **Persistent Sessions**: Cart and user data saved across browser sessions

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context API for cart and authentication
- **Icons**: Lucide React for consistent iconography
- **Storage**: localStorage for data persistence
- **UI Components**: Radix UI primitives with custom styling

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eduprint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The optimized build will be generated in the `dist` folder.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx  # Main navigation header
│   ├── FeaturedProducts.tsx  # Product catalog
│   ├── ProductDetailModal.tsx  # Product preview modal
│   ├── ProductCustomizationModal.tsx  # Customization interface
│   ├── CartDrawer.tsx  # Shopping cart sidebar
│   ├── AuthModal.tsx   # Login/signup modal
│   ├── OrderHistory.tsx  # Order management
│   └── ...
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── CartContext.tsx # Shopping cart state
├── data/              # Static data and configurations
│   └── products.ts    # Product catalog data
├── hooks/             # Custom React hooks
├── lib/              # Utility functions
└── pages/            # Page components
    └── Index.tsx     # Main landing page
```

## 🎨 Key Components

### Product Catalog (`FeaturedProducts.tsx`)
- Displays products in a responsive grid
- Implements search and filtering functionality
- Handles product interactions (view, customize, add to cart)

### Product Customization (`ProductCustomizationModal.tsx`)
- Real-time text customization with live preview
- Font, color, and positioning options
- Price calculation with customization fees

### Shopping Cart (`CartDrawer.tsx`)
- Persistent cart state across sessions
- Quantity management and item removal
- Integrated checkout process

### Authentication (`AuthContext.tsx`)
- User registration and login
- Profile management
- Session persistence

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components adapt seamlessly across different screen sizes.

## 🔧 Customization

### Adding New Products
Edit `src/data/products.ts` to add new products:

```typescript
{
  id: 101,
  name: "Custom Product",
  description: "Product description",
  price: 29.99,
  category: "stationery",
  image: "/path/to/image.jpg",
  customizable: true,
  // ... other properties
}
```

### Styling Customization
The project uses Tailwind CSS. Modify styles in:
- `tailwind.config.ts` for theme configuration
- Individual component files for specific styling
- `src/index.css` for global styles

### Adding New Categories
Update the `categories` array in `src/data/products.ts` and ensure products are tagged with the appropriate category.

## 🚀 Deployment

### Production Deployment
The project can be deployed on various platforms:

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - **Vercel**: Connect your repository for automatic deployment
   - **Netlify**: Drag and drop the build folder or connect via Git
   - **AWS S3 + CloudFront**: Upload build files to S3 bucket
   - **Traditional Web Hosting**: Upload files via FTP to your web server

### Environment Configuration
For production deployment, configure environment variables:
- API endpoints
- Authentication services
- Payment gateway credentials
- Analytics tracking codes

## 🔒 Security Considerations

- User authentication uses client-side storage (suitable for demo purposes)
- For production deployment, integrate with a proper authentication service
- Implement server-side validation for cart and order processing
- Use HTTPS for all production deployments
- Implement proper CORS policies for API access

## 🤝 Contributing

EduCerns welcomes contributions to improve Eduprint:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support & Contact

For support, questions, or enterprise solutions:

- **EduCerns Support Team**: support@educerns.com
- **Technical Documentation**: [docs.educerns.com](https://docs.educerns.com)
- **GitHub Issues**: Create an issue in the repository
- **Enterprise Sales**: enterprise@educerns.com

### Business Hours
- Monday - Friday: 10:00 AM - 6:00 PM EST
- Emergency Support: Available 24/7 for enterprise clients

## 🏢 About EduCerns

EduCerns is a technology company specializing in educational and business solutions. Our mission is to empower organizations with innovative digital tools that streamline operations and enhance productivity. Eduprint is part of our comprehensive suite of business automation tools designed for modern enterprises.


## 🌟 Enterprise Solutions

EduCerns offers enterprise-grade solutions for large organizations:

- **White-label Solutions**: Custom-branded versions of Eduprint
- **API Integration**: Seamless integration with existing business systems
- **Custom Development**: Tailored features and functionality
- **Dedicated Support**: Priority support with dedicated account management
- **On-premise Deployment**: Self-hosted solutions for enhanced security
- **Bulk Licensing**: Volume discounts for enterprise deployments

Contact our enterprise team at enterprise@educerns.com for custom pricing and solutions.

---

**Eduprint by EduCerns** - Empowering businesses with professional stationery and promotional materials through innovative technology solutions.
