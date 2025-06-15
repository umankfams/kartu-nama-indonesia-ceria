
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, PlusCircle, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BackgroundImage = {
  id: string;
  url: string;
  name: string;
};

const ManageBackgrounds = () => {
  const [backgrounds, setBackgrounds] = useState<BackgroundImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const handleAddBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({
        title: "File bukan gambar!",
        description: "Silakan upload file gambar (.jpg, .png)",
        variant: "destructive"
      });
      return;
    }
    const url = URL.createObjectURL(file);
    setBackgrounds(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        url,
        name: file.name,
      }
    ]);
    toast({
      title: "Gambar berhasil ditambahkan!",
      description: "Background baru siap digunakan."
    });
    // Reset value so same file can be uploaded again if needed
    e.target.value = "";
  };

  const handleRemove = (id: string) => {
    setBackgrounds((prev) => prev.filter(bg => bg.id !== id));
    toast({
      title: "Gambar dihapus!",
      description: "Background telah dihapus dari daftar."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Image className="w-6 h-6 text-blue-600" />
              Kelola Background Kartu Nama
            </CardTitle>
            <p className="text-gray-500 text-sm mt-2">
              Upload, lihat, dan hapus gambar latar belakang untuk kartu nama Anda.
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <Button
                variant="secondary"
                className="flex items-center gap-2 mb-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <PlusCircle className="w-4 h-4" />
                Upload Background Baru
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAddBackground}
                className="hidden"
              />
              <p className="text-xs text-gray-500 pl-1">
                Rekomendasi: JPG/PNG, maksimal 5MB, 1050x600px.
              </p>
            </div>
            <div>
              {backgrounds.length === 0 ? (
                <div className="text-center text-gray-400 py-8 flex flex-col items-center">
                  <Image className="w-10 h-10 mb-2" />
                  Belum ada background kartu nama yang diupload.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {backgrounds.map((bg) => (
                    <div
                      key={bg.id}
                      className="relative group border rounded overflow-hidden"
                    >
                      <img
                        src={bg.url}
                        alt={bg.name}
                        className="w-full h-32 object-cover"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 transition"
                        onClick={() => handleRemove(bg.id)}
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-xs text-white px-2 py-1 truncate">
                        {bg.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageBackgrounds;
