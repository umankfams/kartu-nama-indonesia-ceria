
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type StepProps = {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
};

const OrderStep1Personal = ({ formData, handleInputChange }: StepProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-gray-900 border-b pb-2">
      Informasi Pribadi
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Lengkap *</Label>
        <Input
          id="nama"
          placeholder="Masukkan nama lengkap"
          value={formData.nama}
          onChange={(e) => handleInputChange("nama", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="jabatan">Jabatan *</Label>
        <Input
          id="jabatan"
          placeholder="Co-founder & CEO"
          value={formData.jabatan}
          onChange={(e) => handleInputChange("jabatan", e.target.value)}
          required
        />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="perusahaan">Nama Perusahaan *</Label>
          <Input
            id="perusahaan"
            placeholder="PT. Nama Perusahaan"
            value={formData.perusahaan}
            onChange={(e) => handleInputChange("perusahaan", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website (Opsional)</Label>
          <Input
            id="website"
            placeholder="www.perusahaan.com"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
          />
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="telepon">Nomor Telepon *</Label>
        <Input
          id="telepon"
          placeholder="+62 812-3456-7890"
          value={formData.telepon}
          onChange={(e) => handleInputChange("telepon", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="nama@perusahaan.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="alamat">Alamat Perusahaan</Label>
      <Textarea
        id="alamat"
        placeholder="Jl. Contoh No. 123, Jakarta Selatan"
        value={formData.alamat}
        onChange={(e) => handleInputChange("alamat", e.target.value)}
        className="min-h-[80px]"
      />
    </div>
    
  </div>
);
export default OrderStep1Personal;
