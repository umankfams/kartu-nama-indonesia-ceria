
import React from "react";
import { Label } from "@/components/ui/label";

type StepProps = {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
};

const paymentOptions = [
  { value: "bank_transfer", label: "Bank Transfer (BCA/BNI/Mandiri)" },
  { value: "gopay", label: "GoPay" },
  { value: "ovo", label: "OVO" },
  { value: "dana", label: "DANA" },
  { value: "cod", label: "Bayar di Tempat (COD)" }
];

const OrderStep5Payment = ({ formData, handleInputChange }: StepProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-gray-900 border-b pb-2">
      Pilih Opsi Pembayaran
    </h3>
    <div className="space-y-2">
      {paymentOptions.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="paymentOption"
            value={option.value}
            checked={formData.paymentOption === option.value}
            onChange={() => handleInputChange("paymentOption", option.value)}
            className="accent-blue-600"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
    {formData.paymentOption && (
      <div className="text-sm mt-3 text-gray-600">
        Anda memilih:{" "}
        <span className="font-semibold">{paymentOptions.find(po => po.value === formData.paymentOption)?.label}</span>
      </div>
    )}
  </div>
);

export default OrderStep5Payment;
