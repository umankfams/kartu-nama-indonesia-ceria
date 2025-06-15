
import React from "react";
import { CreditCard, Phone, Mail, MapPin } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type OrderCardPreviewProps = {
  formData: any;
  getCardBackground: () => string;
  getTextColor: () => string;
  getAccentColor: () => string;
  previewRef: React.RefObject<HTMLDivElement>;
};

const OrderCardPreview = ({
  formData,
  getCardBackground,
  getTextColor,
  getAccentColor,
  previewRef,
}: OrderCardPreviewProps) => (
  <AspectRatio ratio={4 / 7} className="w-full max-w-[420px] mx-auto">
    <div ref={previewRef} className="w-full h-full rounded-xl overflow-hidden">
      <div
        className={`${getCardBackground()} ${getTextColor()} p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300 relative overflow-hidden w-full h-full`}
        style={
          formData.background === "custom" && formData.customBackground
            ? {
                backgroundImage: `url(${formData.customBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }
            : {}
        }
      >
        {/* Custom background overlay for better text readability */}
        {formData.background === "custom" && formData.customBackground && (
          <div className="absolute inset-0 bg-black/40 z-0"></div>
        )}
        {formData.background === "geometric" && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 border border-white/30 rotate-45"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/30 rotate-12"></div>
            <div className="absolute top-1/2 left-1/3 w-12 h-12 border border-white/30 -rotate-45"></div>
          </div>
        )}

        <div className="space-y-4 relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold">{formData.nama || "Nama Anda"}</h3>
              <p className={`${getAccentColor()} font-medium`}>
                {formData.jabatan || "Jabatan Anda"}
              </p>
              <p className="text-sm mt-1 opacity-80">
                {formData.perusahaan || "Nama Perusahaan"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {formData.logo && (
                <img
                  src={formData.logo}
                  alt="Logo"
                  className="w-12 h-12 object-contain rounded"
                />
              )}
              <CreditCard className={`w-8 h-8 ${getAccentColor()}`} />
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className={`w-4 h-4 ${getAccentColor()}`} />
              <span>{formData.telepon || "+62 xxx-xxxx-xxxx"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className={`w-4 h-4 ${getAccentColor()}`} />
              <span>{formData.email || "email@perusahaan.com"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${getAccentColor()}`} />
              <span className="text-xs leading-relaxed">
                {formData.alamat || "Alamat Perusahaan"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AspectRatio>
);

export default OrderCardPreview;
