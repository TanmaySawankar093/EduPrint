
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCustomizationModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductCustomizationModal = ({ product, isOpen, onClose }: ProductCustomizationModalProps) => {
  const [customText, setCustomText] = useState("");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedPosition, setSelectedPosition] = useState("center");
  const { addToCart } = useCart();
  const { toast } = useToast();

  const fonts = ["Arial", "Times New Roman", "Helvetica", "Georgia", "Verdana"];
  const positions = ["center", "top-left", "top-right", "bottom-left", "bottom-right"];

  const handleAddToCart = () => {
    if (!product) return;

    const customization = product.customizable ? {
      text: customText,
      font: selectedFont,
      color: selectedColor,
      position: selectedPosition
    } : undefined;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      customization
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });

    onClose();
    setCustomText("");
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize {product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Preview */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            {product.customizable && customText && (
              <div
                className={`absolute text-sm font-semibold p-2 bg-white/80 rounded ${
                  selectedPosition === "center" ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" :
                  selectedPosition === "top-left" ? "top-2 left-2" :
                  selectedPosition === "top-right" ? "top-2 right-2" :
                  selectedPosition === "bottom-left" ? "bottom-2 left-2" :
                  "bottom-2 right-2"
                }`}
                style={{ 
                  color: selectedColor,
                  fontFamily: selectedFont
                }}
              >
                {customText}
              </div>
            )}
          </div>

          {product.customizable && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="customText">Custom Text</Label>
                <Input
                  id="customText"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Enter your company name or text"
                  maxLength={50}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Font</Label>
                  <Select value={selectedFont} onValueChange={setSelectedFont}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Position</Label>
                  <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position.replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="color">Text Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Button onClick={handleAddToCart} className="flex-1">
              Add to Cart - ${product.price}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCustomizationModal;
