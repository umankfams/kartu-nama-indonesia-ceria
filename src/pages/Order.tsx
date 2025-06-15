import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { toJpeg } from "html-to-image";

import OrderCardPreview from "./order-steps/OrderCardPreview";
import OrderStep1Personal from "./order-steps/OrderStep1Personal";
import OrderStep2Design from "./order-steps/OrderStep2Design";
import OrderStep3Specification from "./order-steps/OrderStep3Specification";
import OrderStep4Shipping from "./order-steps/OrderStep4Shipping";
import OrderStep5Payment from "./order-steps/OrderStep5Payment";

import backgroundOptions from "@/utils/backgroundOptions";
import bahanOptions from "@/utils/bahanOptions";
import finishingOptions from "@/utils/finishingOptions";
import jumlahOptions from "@/utils/jumlahOptions";

const Order = () => {
  const navigate = useNavigate();
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
    jumlah: "",
    background: "",
    customBackground: "",
    logo: "",
    fontNama: "font-sans",
    fontNamaColor: "#18181b",
    fontJabatan: "font-sans",
    fontJabatanColor: "#2563eb",
    fontPerusahaan: "font-sans",
    fontPerusahaanColor: "#374151",
    fontKontak: "font-sans",
    fontKontakColor: "#111111",
    shippingName: "",
    shippingPhone: "",
    shippingAddress: "",
    shippingNote: "",
    paymentOption: ""
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Ref for downloading preview
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPreview = async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await toJpeg(previewRef.current, { quality: 0.98, backgroundColor: "#fff" });
      const link = document.createElement("a");
      link.download = "kartu-nama-preview.jpg";
      link.href = dataUrl;
      link.click();
      toast({
        title: "Preview berhasil diunduh!",
        description: "Gambar preview kartu nama telah disimpan ke perangkat Anda.",
      });
    } catch (err) {
      toast({
        title: "Gagal mengunduh preview.",
        description: "Terjadi kesalahan saat membuat gambar. Coba lagi atau ganti browser.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: string, file: File) => {
    const url = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, [field]: url }));
    toast({
      title: "Gambar berhasil diunggah!",
      description: `${field === 'customBackground' ? 'Latar belakang' : 'Logo'} telah ditambahkan ke kartu nama Anda.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesanan Berhasil Dikirim!",
      description: "Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi pesanan.",
    });
    console.log("Form submitted:", formData);
  };

  // Step management
  const stepComponents = [
    <OrderStep1Personal key="step1" formData={formData} handleInputChange={handleInputChange} />,
    <OrderStep2Design 
      key="step2" 
      formData={formData}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      backgroundOptions={backgroundOptions}
    />,
    <OrderStep3Specification
      key="step3"
      formData={formData}
      handleInputChange={handleInputChange}
      bahanOptions={bahanOptions}
      finishingOptions={finishingOptions}
      jumlahOptions={jumlahOptions}
    />,
    <OrderStep4Shipping key="step4" formData={formData} handleInputChange={handleInputChange} />,
    <OrderStep5Payment key="step5" formData={formData} handleInputChange={handleInputChange} />,
  ];

  const stepTitles = [
    "Informasi Pribadi",
    "Desain Kartu",
    "Spesifikasi Kartu",
    "Info Pengiriman",
    "Opsi Pembayaran"
  ];

  // Visual helpers (from previous code)
  const getCardBackground = () => {
    if (formData.background === "custom" && formData.customBackground) {
      return `bg-cover bg-center bg-no-repeat`;
    }
    switch (formData.background) {
      case "gradient-blue":
        return "bg-gradient-to-br from-blue-600 to-blue-800";
      case "gradient-purple":
        return "bg-gradient-to-br from-purple-600 to-purple-800";
      case "minimal-white":
        return "bg-white border-2 border-gray-200 text-gray-900";
      case "geometric":
        return "bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden";
      case "texture-paper":
        return "bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 text-gray-800";
      case "solid-dark":
      default:
        return "bg-gradient-to-br from-gray-900 to-gray-700";
    }
  };

  const getTextColor = () => {
    if (formData.background === "minimal-white" || formData.background === "texture-paper") {
      return "text-gray-900";
    }
    return "text-white";
  };

  const getAccentColor = () => {
    if (formData.background === "minimal-white") {
      return "text-blue-600";
    }
    if (formData.background === "texture-paper") {
      return "text-amber-600";
    }
    return "text-blue-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">Kartunama</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          {stepTitles.map((title, idx) => (
            <div key={title} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors
                ${idx === currentStep ? "bg-blue-600 text-white"
                  : idx < currentStep ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}
              `}>
                {idx + 1}
              </div>
              <span className={`hidden md:inline-block transition-colors text-sm font-medium 
                ${idx === currentStep ? "text-blue-600" : "text-gray-500"}
              `}>
                {title}
              </span>
              {idx < stepTitles.length - 1 && (
                <span className="w-6 h-1 bg-gray-300 rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 pb-16 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Preview Card + Download */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Preview Kartu Nama Anda
                </h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDownloadPreview}
                  type="button"
                >
                  <Download className="w-4 h-4" /> Unduh JPG
                </Button>
              </div>
              <OrderCardPreview
                formData={formData}
                getCardBackground={getCardBackground}
                getTextColor={getTextColor}
                getAccentColor={getAccentColor}
                previewRef={previewRef}
              />
            </div>

            {/* Steps form area */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur p-8">
              <div className="space-y-6">
                {stepComponents[currentStep]}
              </div>
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))}
                >
                  Kembali
                </Button>
                {currentStep < stepComponents.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep((s) => Math.min(s + 1, stepComponents.length - 1))}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    Lanjutkan
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    Kirim Pesanan & Dapatkan Penawaran
                  </Button>
                )}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                * Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi pesanan dan pembayaran
              </p>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Order;
