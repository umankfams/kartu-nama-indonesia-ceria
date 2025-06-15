
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, PlusCircle, Image, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BackgroundOption = {
  id: string;
  type: "image" | "css";
  name: string;
  // for image
  url?: string;
  // for css
  cssTemplate?: string;
};

const ManageBackgrounds = () => {
  const [backgrounds, setBackgrounds] = useState<BackgroundOption[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  // For CSS template background input
  const [cssName, setCssName] = useState("");
  const [cssTemplate, setCssTemplate] = useState("");
  const [cssInputOpen, setCssInputOpen] = useState(false);

  const handleAddBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({
        title: "File bukan gambar!",
        description: "Silakan upload file gambar (.jpg, .png)",
        variant: "destructive",
      });
      return;
    }
    const url = URL.createObjectURL(file);
    setBackgrounds((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random(),
        type: "image",
        url,
        name: file.name,
      },
    ]);
    toast({
      title: "Gambar berhasil ditambahkan!",
      description: "Background baru siap digunakan.",
    });
    e.target.value = "";
  };

  const handleAddCssBackground = () => {
    if (!cssName.trim() || !cssTemplate.trim()) {
      toast({
        title: "Form tidak lengkap",
        description: "Isi nama dan template CSS.",
        variant: "destructive",
      });
      return;
    }
    setBackgrounds((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random(),
        type: "css",
        name: cssName.trim(),
        cssTemplate: cssTemplate.trim(),
      },
    ]);
    setCssName("");
    setCssTemplate("");
    setCssInputOpen(false);
    toast({
      title: "Template CSS berhasil ditambahkan!",
      description: "Background baru siap digunakan.",
    });
  };

  const handleRemove = (id: string) => {
    setBackgrounds((prev) => prev.filter((bg) => bg.id !== id));
    toast({
      title: "Background dihapus!",
      description: "Background telah dihapus dari daftar.",
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
              Upload, lihat, dan hapus gambar atau template CSS latar belakang untuk kartu nama Anda.
            </p>
          </CardHeader>
          <CardContent>
            {/* UPLOAD AREA */}
            <div className="mb-8 flex flex-col gap-4">
              <div>
                <Button
                  variant="secondary"
                  className="flex items-center gap-2 mb-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <PlusCircle className="w-4 h-4" />
                  Upload Background Gambar Baru
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAddBackgroundImage}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 pl-1">
                  Rekomendasi: JPG/PNG, maksimal 5MB, 1050x600px.
                </p>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setCssInputOpen((v) => !v)}
                  type="button"
                >
                  <Code2 className="w-4 h-4" />
                  {cssInputOpen ? "Batal" : "Tambah Background CSS"}
                </Button>
                {cssInputOpen && (
                  <div className="bg-gray-100 rounded-lg mt-3 p-4 flex flex-col gap-2 shadow-inner border">
                    <Input
                      value={cssName}
                      onChange={(e) => setCssName(e.target.value)}
                      placeholder="Nama background, contoh: Gradient Ungu"
                      className="mb-1"
                      maxLength={50}
                    />
                    <Input
                      value={cssTemplate}
                      onChange={(e) => setCssTemplate(e.target.value)}
                      placeholder="Class CSS Tailwind atau style inline, ex: bg-gradient-to-r from-purple-600 to-blue-500"
                      className="mb-1 font-mono"
                      maxLength={128}
                    />
                    <Button
                      onClick={handleAddCssBackground}
                      className="w-fit self-end"
                      size="sm"
                    >
                      Simpan CSS
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {/* DAFTAR BACKGROUND */}
            <div>
              {backgrounds.length === 0 ? (
                <div className="text-center text-gray-400 py-8 flex flex-col items-center">
                  <Image className="w-10 h-10 mb-2" />
                  Belum ada background kartu nama atau template CSS yang diupload/dimasukkan.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {backgrounds.map((bg) =>
                    bg.type === "image" ? (
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
                    ) : (
                      <div
                        key={bg.id}
                        className="relative group border rounded overflow-hidden bg-white flex flex-col"
                      >
                        <div
                          className={`w-full h-20 my-2 rounded transition-all border mb-1`}
                          style={{}}
                        >
                          {/* Preview area of the CSS background */}
                          <div
                            className={`w-full h-full rounded ${bg.cssTemplate} transition-all`}
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 transition"
                          onClick={() => handleRemove(bg.id)}
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="bg-black/10 text-xs text-gray-900 px-2 py-1 truncate">
                          <Code2 className="inline-block mb-0.5 mr-1 w-3 h-3" />
                          {bg.name}
                        </div>
                        <div className="bg-white text-[11px] font-mono text-gray-600 px-2 py-[3px] truncate border-t border-gray-200">
                          {bg.cssTemplate}
                        </div>
                      </div>
                    )
                  )}
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
