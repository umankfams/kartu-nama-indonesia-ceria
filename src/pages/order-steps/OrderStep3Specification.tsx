
import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type StepProps = {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  bahanOptions: any[];
  finishingOptions: any[];
  jumlahOptions: any[];
};

const OrderStep3Specification = ({
  formData,
  handleInputChange,
  bahanOptions,
  finishingOptions,
  jumlahOptions
}: StepProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-gray-900 border-b pb-2">
      Spesifikasi Kartu
    </h3>
    <div className="space-y-2">
      <Label htmlFor="bahan">Pilih Bahan *</Label>
      <Select value={formData.bahan} onValueChange={(value) => handleInputChange("bahan", value)} required>
        <SelectTrigger>
          <SelectValue placeholder="Pilih jenis bahan" />
        </SelectTrigger>
        <SelectContent>
          {bahanOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex justify-between items-center w-full">
                <span>{option.label}</span>
                <Badge variant="secondary" className="ml-2">
                  {option.price}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="finishing">Pilih Finishing</Label>
      <Select value={formData.finishing} onValueChange={(value) => handleInputChange("finishing", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Pilih jenis finishing" />
        </SelectTrigger>
        <SelectContent>
          {finishingOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex justify-between items-center w-full">
                <span>{option.label}</span>
                <Badge variant="outline" className="ml-2">
                  {option.price}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="jumlah">Jumlah Pesanan *</Label>
      <Select value={formData.jumlah} onValueChange={(value) => handleInputChange("jumlah", value)} required>
        <SelectTrigger>
          <SelectValue placeholder="Pilih jumlah pesanan" />
        </SelectTrigger>
        <SelectContent>
          {jumlahOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default OrderStep3Specification;
