import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign, User, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  gigTitle: string;
  buyer: string;
  student: string;
  amount: number;
}

const mockOrders: Order[] = [
  { id: "ORD-001", gigTitle: "Modern Website Design", buyer: "John Doe", student: "Sarah Johnson", amount: 150 },
  { id: "ORD-002", gigTitle: "Marketing Copy Writing", buyer: "Jane Smith", student: "Mike Chen", amount: 75 },
  { id: "ORD-003", gigTitle: "Social Media Graphics", buyer: "Alex Wilson", student: "Emma Davis", amount: 90 },
];

export default function IssueRefund() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedOrder = mockOrders.find(order => order.id === selectedOrderId);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedOrderId) {
      newErrors.orderId = "Please select an order";
    }

    if (!refundAmount) {
      newErrors.refundAmount = "Refund amount is required";
    } else {
      const amount = parseFloat(refundAmount);
      if (amount < 0.01) {
        newErrors.refundAmount = "Minimum refund amount is $0.01";
      } else if (selectedOrder && amount > selectedOrder.amount) {
        newErrors.refundAmount = "Refund amount cannot exceed order value";
      }
    }

    if (!refundReason.trim()) {
      newErrors.refundReason = "Refund reason is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Process refund - frontend only simulation
      toast({
        title: "Refund issued successfully",
        description: `$${refundAmount} refund has been processed for order ${selectedOrderId}`,
      });
      navigate("/admin/orders");
    }
  };

  const isFormValid = selectedOrderId && refundAmount && refundReason.trim() && Object.keys(errors).length === 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/admin/orders")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Issue Refund</h1>
          <p className="text-muted-foreground mt-2">
            Process a refund for an order with detailed reason tracking
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Refund Form */}
        <div className="lg:col-span-2">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Refund Details
              </CardTitle>
              <CardDescription>
                Enter the refund information and reason for processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Selection */}
              <div className="space-y-2">
                <Label htmlFor="orderSelect">Order Number *</Label>
                <Select value={selectedOrderId} onValueChange={setSelectedOrderId}>
                  <SelectTrigger id="orderSelect" className={errors.orderId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select an order to refund..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockOrders.map((order) => (
                      <SelectItem key={order.id} value={order.id}>
                        {order.id} - {order.gigTitle} (${order.amount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.orderId && (
                  <p className="text-sm text-destructive">{errors.orderId}</p>
                )}
              </div>

              {/* Order Details (Auto-populated) */}
              {selectedOrder && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Buyer Name</Label>
                    <Input 
                      value={selectedOrder.buyer} 
                      readOnly 
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Student Name</Label>
                    <Input 
                      value={selectedOrder.student} 
                      readOnly 
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {/* Refund Amount */}
              <div className="space-y-2">
                <Label htmlFor="refundAmount">Refund Amount ($) *</Label>
                <Input
                  id="refundAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  max={selectedOrder?.amount || undefined}
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  placeholder="0.00"
                  className={errors.refundAmount ? "border-destructive" : ""}
                />
                {selectedOrder && (
                  <p className="text-xs text-muted-foreground">
                    Maximum refund: ${selectedOrder.amount}
                  </p>
                )}
                {errors.refundAmount && (
                  <p className="text-sm text-destructive">{errors.refundAmount}</p>
                )}
              </div>

              {/* Refund Reason */}
              <div className="space-y-2">
                <Label htmlFor="refundReason">Refund Reason *</Label>
                <Textarea
                  id="refundReason"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="Explain why this refund is being issued..."
                  rows={4}
                  className={errors.refundReason ? "border-destructive" : ""}
                />
                {errors.refundReason && (
                  <p className="text-sm text-destructive">{errors.refundReason}</p>
                )}
              </div>

              {/* Form Validation Alert */}
              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please correct the errors above before submitting the refund.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview/Summary Section */}
        <div className="lg:col-span-1">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Refund Summary
              </CardTitle>
              <CardDescription>
                Review before confirming
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedOrder ? (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Order:</span>
                      <span className="font-mono">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="text-right">{selectedOrder.gigTitle}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Original Amount:</span>
                      <span className="font-medium">${selectedOrder.amount}</span>
                    </div>
                    {refundAmount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Refund Amount:</span>
                        <span className="font-bold text-destructive">${refundAmount}</span>
                      </div>
                    )}
                  </div>

                  {refundReason && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Reason:</p>
                      <p className="text-sm bg-muted/50 p-2 rounded text-wrap">
                        {refundReason}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <User className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Select an order to see refund summary
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin/orders")}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="bg-gradient-primary shadow-primary"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Confirm Refund
        </Button>
      </div>
    </div>
  );
}