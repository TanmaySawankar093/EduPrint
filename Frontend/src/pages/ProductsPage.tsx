import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedProducts from "@/components/FeaturedProducts";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <div>
      <FeaturedProducts
        searchQuery={searchQuery}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default ProductsPage;