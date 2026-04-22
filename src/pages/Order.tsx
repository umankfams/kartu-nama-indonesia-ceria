import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { toJpeg } from "html-to-image";
import { backgroundOptions } from "@/utils/Options";
import { useBackgroundTemplates, isTemplateValue } from "@/hooks/useBackgroundTemplates";

import OrderHeader from "./order-steps/OrderHeader";
import OrderProgressBar from "./order-steps/OrderProgressBar";
import OrderPreviewSection from "./order-steps/OrderPreviewSection";
import OrderFormSection from "./order-steps/OrderFormSection";

const DEFAULT_ELEMENT_POSITIONS = {
  name: { x: 30, y: 24 },
  jabatan: { x: 32, y: 64 },
  perusahaan: { x: 32, y: 96 },
  logo: { x: 338, y: 24 },
  telepon: { x: 32, y: 146 },
  email: { x: 32, y: 172 },
  alamat: { x: 32, y: 196 },
};

const Order = () => {
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);

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
    paymentOption: "",
    elementPositions: { ...DEFAULT_ELEMENT_POSITIONS },
  });

  const { templates: dbTemplates } = useBackgroundTemplates();
  const allBackgroundOptions = [...backgroundOptions, ...dbTemplates];

  const [currentStep, setCurrentStep] = useState(0);
  const [editLayout, setEditLayout] = useState(false);
  const [elementPositions, setElementPositions] = useState(() =>
    formData.elementPositions || { ...DEFAULT_ELEMENT_POSITIONS }
  );

  const handleUpdatePositions = (newPositions: typeof elementPositions) => {
    setElementPositions(newPositions);
    setFormData((prev) => ({ ...prev, elementPositions: newPositions }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: string, file: File) => {
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, [field]: url }));
    toast({
      title: "Gambar berhasil diunggah!",
      description: `${field === "customBackground" ? "Latar belakang" : "Logo"} telah ditambahkan ke kartu nama Anda.`,
    });
  };

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
    } catch {
      toast({
        title: "Gagal mengunduh preview.",
        description: "Terjadi kesalahan saat membuat gambar. Coba lagi atau ganti browser.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesanan Berhasil Dikirim!",
      description: "Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi pesanan.",
    });
    console.log("Form submitted:", formData);
  };

  const selectedOption = allBackgroundOptions.find((opt) => opt.value === formData.background);

  const getCardBackground = () =>
    selectedOption?.className ?? backgroundOptions[0].className;

  const getCardStyle = (): React.CSSProperties => {
    if (!selectedOption) return {};
    if (isTemplateValue(formData.background) && "imageUrl" in selectedOption && selectedOption.imageUrl) {
      return {
        backgroundImage: `url(${selectedOption.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    }
    return (selectedOption as { style?: React.CSSProperties }).style ?? {};
  };

  const getTextColor = () =>
    formData.background === "minimal-white" || formData.background === "texture-paper"
      ? "text-gray-900"
      : "text-white";

  const getAccentColor = () => {
    if (formData.background === "minimal-white") return "text-blue-600";
    if (formData.background === "texture-paper") return "text-amber-600";
    return "text-blue-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <OrderHeader />
      <OrderProgressBar currentStep={currentStep} />

      <div className="container mx-auto px-4 pb-16 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <OrderPreviewSection
            formData={formData}
            elementPositions={elementPositions}
            onUpdatePositions={handleUpdatePositions}
            getCardBackground={getCardBackground}
            getTextColor={getTextColor}
            getAccentColor={getAccentColor}
            previewRef={previewRef}
            editLayout={editLayout}
            onToggleEditLayout={() => setEditLayout((e) => !e)}
            onDownload={handleDownloadPreview}
          />

          <OrderFormSection
            formData={formData}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
