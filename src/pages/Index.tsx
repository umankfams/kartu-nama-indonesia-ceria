
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Phone, Mail, MapPin, Star, Package, Truck, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    perusahaan: "",
    telepon: "",
    email: "",
    alamat: "",
    website: "",
    bahan: "",
    finishing: "",
    jumlah: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesanan Berhasil Dikirim!",
      description: "Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi pesanan.",
    });
    console.log("Form submitted:", formData);
  };

  const bahanOptions = [
    { value: "art-paper-260", label: "Art Paper 260gsm", price: "Rp 150.000" },
    { value: "art-paper-310", label: "Art Paper 310gsm", price: "Rp 180.000" },
    { value: "ivory-260", label: "Ivory 260gsm", price: "Rp 200.000" },
    { value: "linen-280", label: "Linen 280gsm", price: "Rp 250.000" }
  ];

  const finishingOptions = [
    { value: "matte", label: "Matte Laminating", price: "+Rp 50.000" },
    { value: "glossy", label: "Glossy Laminating", price: "+Rp 50.000" },
    { value: "uv-spot", label: "UV Spot", price: "+Rp 100.000" },
    { value: "emboss", label: "Emboss", price: "+Rp 150.000" }
  ];

  const jumlahOptions = [
    { value: "500", label: "500 pcs", multiplier: 1 },
    { value: "1000", label: "1000 pcs", multiplier: 1.8 },
    { value: "2000", label: "2000 pcs", multiplier: 3.2 },
    { value: "5000", label: "5000 pcs", multiplier: 7.5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom duration-1000">
              Kartu Nama Berkualitas Premium
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-in slide-in-from-bottom duration-1000 delay-200">
              Cetak kartu nama profesional dengan kualitas terbaik dan harga terjangkau
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base animate-in slide-in-from-bottom duration-1000 delay-400">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>Kualitas Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-300" />
                <span>Pengiriman Cepat</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-300" />
                <span>Garansi Kualitas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Preview Card */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Preview Kartu Nama Anda
              </h2>
              <p className="text-gray-600">
                Lihat tampilan kartu nama Anda secara real-time
              </p>
            </div>
            
            <Card className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {formData.nama || "Nama Anda"}
                    </h3>
                    <p className="text-blue-300 font-medium">
                      {formData.jabatan || "Jabatan Anda"}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      {formData.perusahaan || "Nama Perusahaan"}
                    </p>
                  </div>
                  <CreditCard className="w-8 h-8 text-blue-300" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-300" />
                    <span>{formData.telepon || "+62 xxx-xxxx-xxxx"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-300" />
                    <span>{formData.email || "email@perusahaan.com"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-300" />
                    <span className="text-xs leading-relaxed">
                      {formData.alamat || "Alamat Perusahaan"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Bahan Premium</h4>
                <p className="text-xs text-gray-600">Art Paper hingga Linen</p>
              </Card>
              <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Finishing Mewah</h4>
                <p className="text-xs text-gray-600">UV Spot & Emboss</p>
              </Card>
              <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Kirim Cepat</h4>
                <p className="text-xs text-gray-600">3-5 Hari Kerja</p>
              </Card>
            </div>
          </div>

          {/* Order Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Pesan Kartu Nama Sekarang
              </CardTitle>
              <CardDescription className="text-gray-600">
                Isi form di bawah untuk mendapatkan penawaran terbaik
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
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
                        className="border-gray-300 focus:border-blue-500"
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
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="perusahaan">Nama Perusahaan *</Label>
                    <Input
                      id="perusahaan"
                      placeholder="PT. Nama Perusahaan"
                      value={formData.perusahaan}
                      onChange={(e) => handleInputChange("perusahaan", e.target.value)}
                      required
                      className="border-gray-300 focus:border-blue-500"
                    />
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
                        className="border-gray-300 focus:border-blue-500"
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
                        className="border-gray-300 focus:border-blue-500"
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
                      className="border-gray-300 focus:border-blue-500 min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Opsional)</Label>
                    <Input
                      id="website"
                      placeholder="www.perusahaan.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">
                    Spesifikasi Kartu
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="bahan">Pilih Bahan *</Label>
                    <Select
                      value={formData.bahan}
                      onValueChange={(value) => handleInputChange("bahan", value)}
                      required
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Pilih jenis bahan" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
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
                    <Select
                      value={formData.finishing}
                      onValueChange={(value) => handleInputChange("finishing", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Pilih jenis finishing" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
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
                    <Select
                      value={formData.jumlah}
                      onValueChange={(value) => handleInputChange("jumlah", value)}
                      required
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Pilih jumlah pesanan" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        {jumlahOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Kirim Pesanan & Dapatkan Penawaran
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  * Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi pesanan dan pembayaran
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lebih dari 10,000+ klien telah mempercayai kami untuk kebutuhan percetakan kartu nama mereka
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kualitas Terjamin</h3>
              <p className="text-sm text-gray-600">Menggunakan mesin cetak offset terbaru</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pengiriman Cepat</h3>
              <p className="text-sm text-gray-600">Proses 3-5 hari kerja ke seluruh Indonesia</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Garansi 100%</h3>
              <p className="text-sm text-gray-600">Uang kembali jika tidak sesuai ekspektasi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Harga Terbaik</h3>
              <p className="text-sm text-gray-600">Harga kompetitif dengan kualitas premium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
