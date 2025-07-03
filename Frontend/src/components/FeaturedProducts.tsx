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
        // Toggle between py-24 and py-12 on repeat clicks
        setPaddingClass((prev) => (prev === "py-24" ? "py-24" : "py-24"));
      } else {
        setPaddingClass("py-12");
      }

    };

    window.addEventListener("hashchange", handleInteraction);

    // Also listen to all anchor clicks
    const links = document.querySelectorAll('a[href="#products"]');
    links.forEach((link) => link.addEventListener("click", handleInteraction));

    // Call once on mount
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
  handleHashChange(); // Call once on mount

  return () => window.removeEventListener("hashchange", handleHashChange);
}, []);


  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
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

    // Filter by search query
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
    onProductClick(product); // Call parent's function instead of navigate
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
      <section id="products" className={`${paddingClass} bg-gray-50 transition-all duration-500 ease-in-out`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Discover our comprehensive range of customizable business assets
            </p>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Filters:</span>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
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
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Search products..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-64"
              />
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => {
                const cartQuantity = getCartItemQuantity(product.id);
                
                return (
                  <Card 
                    key={product.id} 
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        {product.tag && (
                          <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
                            {product.tag}
                          </Badge>
                        )}
                      </div>
                      {product.customizable && (
                        <div className="absolute top-2 right-2">
                          {/* <Badge className="bg-blue-600 text-xs">
                            Customizable
                          </Badge> */}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {product.customizable && (
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={(e) => handleCustomizeClick(product, e)}
                          >
                            Customize
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
                          <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">({product.rating})</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                            )}
                          </div>
                          
                          {cartQuantity > 0 ? (
                            <div className="flex items-center space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(product, cartQuantity - 1);
                                }}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-xs font-medium min-w-[20px]  text-center">
                                {cartQuantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(product, cartQuantity + 1);
                                }}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1 h-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (product.customizable) {
                                  handleCustomizeClick(product, e);
                                } else {
                                  // Add directly to cart for non-customizable items
                                  handleAddToCart(product);
                                  console.log('Add to cart:', product);
                                }
                              }}
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Add To Cart
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