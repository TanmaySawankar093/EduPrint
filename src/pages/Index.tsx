import { useState } from "react";
import Navigation from "@/components/Navigation";
import FeaturedProducts from "@/components/FeaturedProducts";
import ImageSection from "@/components/ImageSection";
import Footer from "@/components/Footer";
import ProductDetailPage from "@/components/ProductDetailPage";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onSearch={setSearchQuery} />

      {/* Conditional Rendering */}
      {selectedProduct ? (
        <ProductDetailPage product={selectedProduct} onBack={handleBack} />
      ) : (
        <FeaturedProducts
          searchQuery={searchQuery}
          onProductClick={handleProductClick}
        />
      )}

      {!selectedProduct && <ImageSection />}
      <Footer />
    </div>
  );
};

export default Index;
