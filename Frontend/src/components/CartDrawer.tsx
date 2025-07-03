
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to proceed with checkout.",
        variant: "destructive",
      });
      return;
    }
    setShowCheckout(true);
  };

  const processPayment = async () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save order to localStorage
    const order = {
      id: Date.now().toString(),
      userId: user?.id,
      items: items,
      billingAddress,
      subtotal: totalPrice,
      shipping,
      tax,
      total,
      status: "confirmed",
      date: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem('eduprint_orders') || '[]');
    orders.push(order);
    localStorage.setItem('eduprint_orders', JSON.stringify(orders));

    clearCart();
    setPaymentProcessing(false);
    setShowCheckout(false);
    onClose();

    toast({
      title: "Order placed successfully!",
      description: `Your order #${order.id} has been confirmed.`,
    });
  };

  if (showCheckout) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Checkout</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Billing Address</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={billingAddress.fullName}
                      onChange={(e) => setBillingAddress({...billingAddress, fullName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={billingAddress.email}
                      onChange={(e) => setBillingAddress({...billingAddress, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={billingAddress.phone}
                    onChange={(e) => setBillingAddress({...billingAddress, phone: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={billingAddress.address}
                    onChange={(e) => setBillingAddress({...billingAddress, address: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={billingAddress.state}
                      onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={billingAddress.zipCode}
                      onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={processPayment} 
                className="w-full" 
                size="lg"
                disabled={paymentProcessing}
              >
                {paymentProcessing ? (
                  "Processing Payment..."
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ₹{total.toFixed(2)} (Demo)
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCheckout(false)} 
                className="w-full"
                disabled={paymentProcessing}
              >
                Back to Cart
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <span>Shopping Cart ({items.length})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <Button className="mt-4" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.customization && (
                      <p className="text-sm text-gray-600">
                        Custom: "{item.customization.text}" in {item.customization.color}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-600 h-8 w-8 p-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-6 mt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (estimated)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
