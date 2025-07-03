import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Eye, Star, Filter, Plus, Minus } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCustomizationModal from "./ProductCustomizationModal";
import ProductDetailModal from "./ProductDetailModal";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface FeaturedProductsProps {
  searchQuery?: string;
  onProductClick: (product: any) => void;
}

const FeaturedProducts = ({ searchQuery = "", onProductClick }: FeaturedProductsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { addToCart, updateQuantity, getCartItemQuantity } = useCart();
  const { toast } = useToast();
  const [paddingClass, setPaddingClass] = useState("py-12");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#products") {
      setPaddingClass("py-24");
    } else {
      setPaddingClass("py-12");
    }
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      const hash = window.location.hash;
      if (hash === "#products") {
        setPaddingClass((prev) => (prev === "py-24" ? "py-24" : "py-24"));
      } else {
        setPaddingClass("py-12");
      }
    };

    window.addEventListener("hashchange", handleInteraction);
    const links = document.querySelectorAll('a[href="#products"]');
    links.forEach((link) => link.addEventListener("click", handleInteraction));
    handleInteraction();

    return () => {
      window.removeEventListener("hashchange", handleInteraction);
      links.forEach((link) =>
        link.removeEventListener("click", handleInteraction)
      );
    };
  }, []);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setPaddingClass(hash === "#products" ? "py-24" : "py-12");
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-100":
          filtered = filtered.filter(product => product.price < 100);
          break;
        case "100-250":
          filtered = filtered.filter(product => product.price >= 100 && product.price <= 250);
          break;
        case "250-500":
          filtered = filtered.filter(product => product.price >= 250 && product.price <= 500);
          break;
        case "over-500":
          filtered = filtered.filter(product => product.price > 500);
          break;
      }
    }

    const query = localSearchQuery.toLowerCase();
    if (query) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, localSearchQuery]);

  const handleProductClick = (product: any) => {
    onProductClick(product);
  };

  const handleCustomizeClick = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setIsCustomizationOpen(true);
  };

  const handleAddToCart = (product) => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity <= 0) {
      updateQuantity(product.id, 0);
      toast({
        title: "Removed from Cart",
        description: `${product.name} has been removed from your cart.`,
      });
    } else {
      updateQuantity(product.id, newQuantity);
      toast({
        title: "Cart Updated",
        description: `${product.name} quantity updated to ${newQuantity}.`,
      });
    }
  };

  const navigate = useNavigate();

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-100", name: "Under 100" },
    { id: "100-250", name: "100 - 250" },
    { id: "250-500", name: "250 - 500" },
    { id: "over-500", name: "Over 500" }
  ];

  return (
    <>
      <section id="products" className={`${paddingClass} bg-white transition-all duration-500 ease-in-out`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-normal text-black mb-8">
              Products
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">Filter:</div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-32 border-gray-300 bg-white">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-24 border-gray-300 bg-white">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.id} value={range.id}>
                        {range.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">Sort by:</div>
                <Select defaultValue="alphabetical">
                  <SelectTrigger className="w-40 border-gray-300 bg-white">
                    <SelectValue placeholder="Alphabetically, A-Z" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical">Alphabetically, A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-gray-600">{filteredProducts.length} products</div>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange("all");
                  setLocalSearchQuery("");
                }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const cartQuantity = getCartItemQuantity(product.id);
                
                return (
                  <Card 
                    key={product.id} 
                    className="group border-0 shadow-none hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer bg-white"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative bg-gray-50 aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        {product.tag && (
                          <Badge className="bg-black text-white text-xs px-2 py-1 font-normal">
                            {product.tag}
                          </Badge>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          className="bg-white text-black hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {product.customizable && (
                          <Button 
                            size="sm" 
                            className="bg-black text-white hover:bg-gray-800"
                            onClick={(e) => handleCustomizeClick(product, e)}
                          >
                            Customize
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-medium text-black text-base mb-1">{product.name}</h3>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">Rs. {product.originalPrice}.00</span>
                            )}
                            <span className="text-lg font-medium text-black">Rs. {product.price}.00</span>
                          </div>
                          
                          {cartQuantity > 0 ? (
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(product, cartQuantity - 1);
                                }}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-sm font-medium min-w-[24px] text-center">
                                {cartQuantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(product, cartQuantity + 1);
                                }}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              className="bg-black text-white hover:bg-gray-800 text-sm px-4 py-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (product.customizable) {
                                  handleCustomizeClick(product, e);
                                } else {
                                  handleAddToCart(product);
                                }
                              }}
                            >
                              Add to cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ProductCustomizationModal
        product={selectedProduct}
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
      />
      
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
};

export default FeaturedProducts;