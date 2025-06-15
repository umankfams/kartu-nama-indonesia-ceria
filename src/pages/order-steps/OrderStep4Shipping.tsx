
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type StepProps = {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
};

const OrderStep4Shipping = ({ formData, handleInputChange }: StepProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-gray-900 border-b pb-2">Informasi Pengiriman</h3>
    <div className="space-y-2">
      <Label htmlFor="shippingName">Nama Penerima *</Label>
      <Input
        id="shippingName"
        placeholder="Nama penerima"
        value={formData.shippingName || ""}
        onChange={(e) => handleInputChange("shippingName", e.target.value)}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="shippingPhone">Telepon Penerima *</Label>
      <Input
        id="shippingPhone"
        placeholder="Nomor telepon penerima"
        value={formData.shippingPhone || ""}
        onChange={(e) => handleInputChange("shippingPhone", e.target.value)}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="shippingAddress">Alamat Pengiriman *</Label>
      <Textarea
        id="shippingAddress"
        placeholder="Contoh: Jl. Mawar No. 88, Bandung, Jawa Barat"
        value={formData.shippingAddress || ""}
        onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="shippingNote">Catatan (Opsional)</Label>
      <Input
        id="shippingNote"
        placeholder="Instruksi kurir (opsional)"
        value={formData.shippingNote || ""}
        onChange={(e) => handleInputChange("shippingNote", e.target.value)}
      />
    </div>
  </div>
);

export default OrderStep4Shipping;
