
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import DraggableTextItem from "./DraggableTextItem";
import DraggableImageItem from "./DraggableImageItem";

type Position = { x: number; y: number };
type ElementPositions = {
  name: Position;
  jabatan: Position;
  perusahaan: Position;
  logo: Position;
  telepon: Position;
  email: Position;
  alamat: Position;
};

type DraggableOrderCardPreviewProps = {
  formData: any;
  elementPositions: ElementPositions;
  onUpdatePositions: (positions: ElementPositions) => void;
  getCardBackground: () => string;
  getTextColor: () => string;
  getAccentColor: () => string;
  previewRef: React.RefObject<HTMLDivElement>;
  editable: boolean;
};

const CARD_WIDTH = 420;
const CARD_HEIGHT = 224;

const DraggableOrderCardPreview = ({
  formData,
  elementPositions,
  onUpdatePositions,
  getCardBackground,
  getTextColor,
  getAccentColor,
  previewRef,
  editable,
}: DraggableOrderCardPreviewProps) => {
  // Move handler for items, updates their {x,y} in the parent state
  const handleMove = (key: keyof ElementPositions, x: number, y: number) => {
    const newPositions = { ...elementPositions, [key]: { x, y }};
    onUpdatePositions(newPositions);
  };

  // Contact color
  const iconColor = formData.fontKontakColor || "#111111";

  return (
    <AspectRatio ratio={7.5 / 4} className="w-full max-w-[420px] mx-auto">
      <div
        id="draggable-card-container"
        ref={previewRef}
        className="w-full h-full rounded-xl overflow-hidden border border-gray-200 relative bg-white shadow-2xl"
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      >
        <div
          className={`${getCardBackground()} ${getTextColor()} absolute w-full h-full left-0 top-0 z-0`}
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
        />
        {/* Overlay for readability if custom bg */}
        {formData.background === "custom" && formData.customBackground && (
          <div className="absolute inset-0 bg-black/40 z-0"></div>
        )}
        {formData.background === "geometric" && (
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-4 right-4 w-20 h-20 border border-white/30 rotate-45"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/30 rotate-12"></div>
            <div className="absolute top-1/2 left-1/3 w-12 h-12 border border-white/30 -rotate-45"></div>
          </div>
        )}

        {/* Name */}
        <DraggableTextItem
          id="name"
          x={elementPositions.name.x}
          y={elementPositions.name.y}
          editable={editable}
          onMove={(_, x, y) => handleMove("name", x, y)}
        >
          <h3
            className={`text-2xl font-bold ${formData.fontNama || "font-sans"}`}
            style={{ color: formData.fontNamaColor || "#18181b" }}
          >
            {formData.nama || "Nama Anda"}
          </h3>
        </DraggableTextItem>

        {/* Jabatan */}
        <DraggableTextItem
          id="jabatan"
          x={elementPositions.jabatan.x}
          y={elementPositions.jabatan.y}
          editable={editable}
          onMove={(_, x, y) => handleMove("jabatan", x, y)}
        >
          <p
            className={`${getAccentColor()} font-medium ${formData.fontJabatan || "font-sans"}`}
            style={{ color: formData.fontJabatanColor || "#2563eb" }}
          >
            {formData.jabatan || "Jabatan Anda"}
          </p>
        </DraggableTextItem>

        {/* Perusahaan */}
        <DraggableTextItem
          id="perusahaan"
          x={elementPositions.perusahaan.x}
          y={elementPositions.perusahaan.y}
          editable={editable}
          onMove={(_, x, y) => handleMove("perusahaan", x, y)}
        >
          <p
            className={`text-sm mt-1 opacity-80 ${formData.fontPerusahaan || "font-sans"}`}
            style={{ color: formData.fontPerusahaanColor || "#374151" }}
          >
            {formData.perusahaan || "Nama Perusahaan"}
          </p>
        </DraggableTextItem>

        {/* Logo */}
        {formData.logo && (
          <DraggableImageItem
            id="logo"
            x={elementPositions.logo.x}
            y={elementPositions.logo.y}
            width={48}
            height={48}
            src={formData.logo}
            editable={editable}
            onMove={(_, x, y) => handleMove("logo", x, y)}
          />
        )}

        {/* Phone */}
        <DraggableTextItem
          id="telepon"
          x={elementPositions.telepon.x}
          y={elementPositions.telepon.y}
          editable={editable}
          onMove={(_, x, y) => handleMove("telepon", x, y)}
        >
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" style={{ color: iconColor }} />
            <span
              className={`${formData.fontKontak || "font-sans"}`}
              style={{ color: iconColor }}
            >
              {formData.telepon || "+62 xxx-xxxx-xxxx"}
            </span>
          </div>
        </DraggableTextItem>

        {/* Email */}
        <DraggableTextItem
          id="email"
          x={elementPositions.email.x}
          y={elementPositions.email.y}
          editable={editable}
          onMove={(_, x, y) => handleMove("email", x, y)}
        >
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" style={{ color: iconColor }} />
            <span
              className={`${formData.fontKontak || "font-sans"}`}
              style={{ color: iconColor }}
            >
              {formData.email || "email@perusahaan.com"}
            </span>
          </div>
        </DraggableTextItem>

        {/* Alamat */}
        <DraggableTextItem
          id="alamat"
          x={elementPositions.alamat.x}
          y={elementPositions.alamat.y}
          editable={editable}
          onMove={(_, x, y) => handleMove("alamat", x, y)}
        >
          <div className={`flex items-center gap-2 text-xs leading-relaxed`}>
            <MapPin className="w-4 h-4" style={{ color: iconColor }} />
            <span
              className={`${formData.fontKontak || "font-sans"}`}
              style={{ color: iconColor }}
            >
              {formData.alamat || "Alamat Perusahaan"}
            </span>
          </div>
        </DraggableTextItem>
      </div>
    </AspectRatio>
  );
};

export default DraggableOrderCardPreview;
