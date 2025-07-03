import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Download, Eye } from "lucide-react";

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Order {
  id: string;
  date: string;
  items: any[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  billingAddress: any;
}

const OrderHistory = ({ isOpen, onClose }: OrderHistoryProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<string | null>(null);

  useEffect(() => {
    // For demo purposes, let's create some sample orders if none exist
    const savedOrders = JSON.parse(localStorage.getItem('eduprint_orders') || '[]');
    if (savedOrders.length === 0) {
      setOrders(savedOrders);
    } else {
      setOrders(savedOrders);
    }
  }, [isOpen]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateInvoiceHTML = (order: Order) => {
    const currentDate = new Date().toLocaleDateString('en-IN');
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;

    return `
      <!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice - ${order.id}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      color: #1a1a1a;
      line-height: 1.5;
      font-size: 14px;
      font-weight: 400;
    }
    
    .invoice-container {
      max-width: 800px;
      margin: 60px auto;
      background: #ffffff;
      padding: 0;
    }
    
    .header { 
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0 0 60px 0;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 60px;
    }
    
    .company-info {
      flex: 1;
    }
    
    .company-name { 
      font-size: 24px; 
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }
    
    .company-tagline { 
      font-size: 14px; 
      color: #666666;
      font-weight: 400;
      line-height: 1.4;
    }
    
    .invoice-meta {
      text-align: right;
      min-width: 200px;
    }
    
    .invoice-title {
      font-size: 32px;
      font-weight: 300;
      color: #1a1a1a;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }
    
    .invoice-number {
      font-size: 16px;
      color: #666666;
      font-weight: 400;
    }
    
    .main-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      margin-bottom: 80px;
    }
    
    .section-group {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    
    .info-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .section-title { 
      font-size: 12px; 
      font-weight: 600; 
      color: #999999;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .info-label {
      font-size: 12px;
      color: #999999;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    
    .info-value {
      font-size: 14px;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 1.4;
    }
    
    .info-value.large {
      font-size: 16px;
      font-weight: 500;
    }
    
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #f0f0f0;
      color: #666666;
      width: fit-content;
    }
    
    .items-section {
      margin-bottom: 60px;
    }
    
    .items-title {
      font-size: 12px; 
      font-weight: 600; 
      color: #999999;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 24px;
    }
    
    .items-table { 
      width: 100%; 
      border-collapse: collapse;
      background: #ffffff;
    }
    
    .items-table th { 
      padding: 0 0 16px 0;
      text-align: left;
      font-weight: 500;
      color: #999999;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      border-bottom: 1px solid #e5e5e5;
    }
    
    .items-table th:last-child,
    .items-table td:last-child {
      text-align: right;
    }
    
    .items-table td { 
      padding: 16px 0;
      border-bottom: 1px solid #f5f5f5;
      vertical-align: top;
    }
    
    .items-table tbody tr:last-child td {
      border-bottom: none;
    }
    
    .item-name {
      font-weight: 400;
      color: #1a1a1a;
      font-size: 14px;
    }
    
    .item-quantity {
      font-weight: 400;
      color: #666666;
      font-size: 14px;
    }
    
    .item-price {
      font-weight: 400;
      color: #1a1a1a;
      font-size: 14px;
    }
    
    .totals-section { 
      margin-left: auto;
      width: 280px;
      margin-bottom: 80px;
    }
    
    .total-row { 
      display: flex; 
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
    }
    
    .total-row:not(:last-child) {
      border-bottom: 1px solid #f5f5f5;
    }
    
    .total-row.final { 
      border-top: 1px solid #e5e5e5;
      padding-top: 20px;
      margin-top: 8px;
      border-bottom: none;
    }
    
    .total-label {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
    }
    
    .total-value {
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
    }
    
    .final .total-label {
      font-size: 16px;
      font-weight: 500;
      color: #1a1a1a;
    }
    
    .final .total-value {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
    }
    
    .footer { 
      border-top: 1px solid #e5e5e5;
      padding-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .footer-left {
      flex: 1;
    }
    
    .footer-company {
      font-size: 16px;
      font-weight: 500;
      color: #1a1a1a;
      margin-bottom: 16px;
    }
    
    .footer-address {
      font-size: 14px;
      color: #666666;
      line-height: 1.5;
    }
    
    .footer-right {
      text-align: right;
    }
    
    .footer-contact {
      font-size: 14px;
      color: #666666;
      line-height: 1.6;
    }
    
    @media print {
      body { 
        margin: 0; 
        background: white;
      }
      .invoice-container {
        margin: 0;
        max-width: none;
      }
      .no-print { 
        display: none; 
      }
    }
    
    @media (max-width: 768px) {
      .invoice-container {
        margin: 20px;
        padding: 0;
      }
      
      .header {
        flex-direction: column;
        gap: 32px;
        padding-bottom: 40px;
        margin-bottom: 40px;
      }
      
      .invoice-meta {
        text-align: left;
        min-width: auto;
      }
      
      .main-content {
        grid-template-columns: 1fr;
        gap: 40px;
        margin-bottom: 60px;
      }
      
      .items-table {
        font-size: 13px;
      }
      
      .items-table th,
      .items-table td {
        padding: 12px 0;
      }
      
      .totals-section {
        width: 100%;
        margin-left: 0;
      }
      
      .footer {
        flex-direction: column;
        gap: 24px;
      }
      
      .footer-right {
        text-align: left;
      }
    }
    
    @media (max-width: 480px) {
      .invoice-container {
        margin: 16px;
      }
      
      .company-name {
        font-size: 20px;
      }
      
      .invoice-title {
        font-size: 24px;
      }
      
      .items-table th:nth-child(2),
      .items-table td:nth-child(2) {
        display: none;
      }
      
      .items-table th:nth-child(3),
      .items-table td:nth-child(3) {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <div class="company-info">
        <div class="company-name">EduPrint Solutions</div>
        <div class="company-tagline">Quality Educational Materials & Printing Services</div>
      </div>
      <div class="invoice-meta">
        <div class="invoice-title">Invoice</div>
        <div class="invoice-number">INV-${order.id}</div>
      </div>
    </div>

    <div class="main-content">
      <div class="section-group">
        <div class="info-section">
          <div class="section-title">Invoice Details</div>
          <div class="info-item">
            <div class="info-label">Order ID</div>
            <div class="info-value">${order.id}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Invoice Date</div>
            <div class="info-value">${currentDate}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Order Date</div>
            <div class="info-value">${new Date(order.date).toLocaleDateString('en-IN')}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Status</div>
            <div class="status-badge">${order.status}</div>
          </div>
        </div>
      </div>
      
      <div class="section-group">
        <div class="info-section">
          <div class="section-title">Bill To</div>
          <div class="info-item">
            <div class="info-label">Name</div>
            <div class="info-value">${order.billingAddress?.fullName}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Address</div>
            <div class="info-value">${order.billingAddress?.address}<br>
            ${order.billingAddress?.city}, ${order.billingAddress?.state} ${order.billingAddress?.zipCode}<br>
            ${order.billingAddress?.country}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="items-section">
      <div class="items-title">Items</div>
      <table class="items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td class="item-name">${item.name}</td>
              <td class="item-quantity">${item.quantity}</td>
              <td class="item-price">₹${item.price.toFixed(2)}</td>
              <td class="item-price">₹${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="totals-section">
      <div class="total-row">
        <span class="total-label">Subtotal</span>
        <span class="total-value">₹${subtotal.toFixed(2)}</span>
      </div>
      <div class="total-row">
        <span class="total-label">GST (18%)</span>
        <span class="total-value">₹${tax.toFixed(2)}</span>
      </div>
      <div class="total-row final">
        <span class="total-label">Total</span>
        <span class="total-value">₹${total.toFixed(2)}</span>
      </div>
    </div>

    <div class="footer">
      <div class="footer-left">
        <div class="footer-company">EduPrint Solutions</div>
        <div class="footer-address">
          123 Business Park<br>
          Mumbai, Maharashtra 400001
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-contact">
          orders@eduprint.com<br>
          +91-22-1234-5678
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `;
  };

  const downloadInvoice = async (order: Order) => {
    setIsGeneratingPDF(order.id);
    
    try {
      // Generate HTML content
      const htmlContent = generateInvoiceHTML(order);
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to download the invoice');
        return;
      }

      // Write HTML content to the new window
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load, then trigger print dialog
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Close the window after printing (user can cancel if needed)
          setTimeout(() => {
            printWindow.close();
          }, 1000);
        }, 500);
      };

      // For actual PDF generation, you could also create a downloadable HTML file
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${order.id}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Error generating invoice. Please try again.');
    } finally {
      setIsGeneratingPDF(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Order History</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
              <p className="text-sm text-gray-400">Your order history will appear here</p>
            </div>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <p className="text-lg font-bold mt-1">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-3">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded" />
                              <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div>
                      <h4 className="font-medium mb-2">Billing Address</h4>
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        <p>{order.billingAddress?.firstName} {order.billingAddress?.lastName}</p>
                        <p>{order.billingAddress?.address}</p>
                        <p>{order.billingAddress?.city}, {order.billingAddress?.state} {order.billingAddress?.zipCode}</p>
                        <p>{order.billingAddress?.country}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadInvoice(order)}
                        disabled={isGeneratingPDF === order.id}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {isGeneratingPDF === order.id ? 'Generating...' : 'Download Invoice'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Track Package
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderHistory;