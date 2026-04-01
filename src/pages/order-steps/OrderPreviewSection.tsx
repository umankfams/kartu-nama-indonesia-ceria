import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import DraggableOrderCardPreview from "./DraggableOrderCardPreview";

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

type Props = {
  formData: any;
  elementPositions: ElementPositions;
  onUpdatePositions: (pos: ElementPositions) => void;
  getCardBackground: () => string;
  getTextColor: () => string;
  getAccentColor: () => string;
  previewRef: React.RefObject<HTMLDivElement>;
  editLayout: boolean;
  onToggleEditLayout: () => void;
  onDownload: () => void;
};

const OrderPreviewSection = ({
  formData,
  elementPositions,
  onUpdatePositions,
  getCardBackground,
  getTextColor,
  getAccentColor,
  previewRef,
  editLayout,
  onToggleEditLayout,
  onDownload,
}: Props) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Preview Kartu Nama Anda
      </h2>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={editLayout ? "outline" : "secondary"}
          size="sm"
          onClick={onToggleEditLayout}
        >
          {editLayout ? "Selesai Edit Layout" : "Edit Layout"}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onDownload}
          type="button"
          disabled={editLayout}
          title={editLayout ? "Selesai edit layout dulu untuk unduh" : ""}
        >
          <Download className="w-4 h-4" /> Unduh JPG
        </Button>
      </div>
    </div>
    <DraggableOrderCardPreview
      formData={formData}
      elementPositions={elementPositions}
      onUpdatePositions={onUpdatePositions}
      getCardBackground={getCardBackground}
      getTextColor={getTextColor}
      getAccentColor={getAccentColor}
      previewRef={previewRef}
      editable={editLayout}
    />
    {editLayout && (
      <p className="text-xs text-blue-600 text-center mt-1">
        Seret setiap elemen di kartu nama untuk mengatur posisinya. Klik "Selesai Edit Layout" bila sudah pas.
      </p>
    )}
  </div>
);

export default OrderPreviewSection;
