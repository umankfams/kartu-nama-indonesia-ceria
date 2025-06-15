
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Image } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type StepProps = {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  handleImageUpload: (field: string, file: File) => void;
  backgroundOptions: any[];
};

const OrderStep2Design = ({ formData, handleInputChange, handleImageUpload, backgroundOptions }: StepProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-gray-900 border-b pb-2">
      Desain Kartu
    </h3>
    <div className="space-y-2">
      <Label htmlFor="background">Pilih Latar Belakang</Label>
      <Select value={formData.background} onValueChange={(value) => handleInputChange("background", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Pilih latar belakang kartu" />
        </SelectTrigger>
        <SelectContent>
          {backgroundOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-3">
                <Image className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="font-medium">{option.label}</span>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    {formData.background === "custom" && (
      <div className="space-y-2">
        <Label htmlFor="customBackground">Upload Gambar Latar Belakang</Label>
        <div className="flex items-center gap-2">
          <Input
            id="customBackground"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload("customBackground", file);
            }}
          />
          <Upload className="w-5 h-5 text-gray-500" />
        </div>
        <p className="text-xs text-gray-500">
          Format: JPG, PNG. Ukuran maksimal: 5MB. Resolusi direkomendasikan: 1050x600px
        </p>
      </div>
    )}
    <div className="space-y-2">
      <Label htmlFor="logo">Upload Logo Perusahaan (Opsional)</Label>
      <div className="flex items-center gap-2">
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload("logo", file);
          }}
        />
        <Upload className="w-5 h-5 text-gray-500" />
      </div>
      <p className="text-xs text-gray-500">
        Format: PNG (dengan background transparan direkomendasikan), JPG. Ukuran maksimal: 2MB
      </p>
    </div>
  </div>
);

export default OrderStep2Design;
