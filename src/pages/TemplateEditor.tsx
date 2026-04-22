import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Upload, Palette, Code2, Sparkles, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

type TemplateType = "image" | "css" | "gradient" | "pattern";

type Template = {
  id: string;
  name: string;
  type: TemplateType;
  value: string;
  preview_url: string | null;
  storage_path: string | null;
  created_at: string;
};

const PATTERN_PRESETS = [
  { name: "Dots", value: "radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px) 0 0 / 16px 16px, #eff6ff" },
  { name: "Stripes", value: "repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 10px, #e5e7eb 10px, #e5e7eb 20px)" },
  { name: "Grid", value: "linear-gradient(#e5e7eb 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(90deg, #e5e7eb 1px, transparent 1px) 0 0 / 20px 20px, #ffffff" },
  { name: "Zigzag", value: "linear-gradient(135deg, #ddd6fe 25%, transparent 25%) 0 0 / 20px 20px, linear-gradient(225deg, #ddd6fe 25%, transparent 25%) 0 0 / 20px 20px, #f5f3ff" },
  { name: "Diagonal", value: "repeating-linear-gradient(-45deg, #fef3c7, #fef3c7 8px, #fde68a 8px, #fde68a 16px)" },
  { name: "Checker", value: "conic-gradient(#e5e7eb 25%, #ffffff 0 50%, #e5e7eb 0 75%, #ffffff 0) 0 0 / 24px 24px" },
];

const renderPreviewStyle = (t: Pick<Template, "type" | "value" | "preview_url">): React.CSSProperties => {
  if (t.type === "image" && t.preview_url) {
    return { backgroundImage: `url(${t.preview_url})`, backgroundSize: "cover", backgroundPosition: "center" };
  }
  if (t.type === "gradient" || t.type === "pattern") {
    return { background: t.value };
  }
  return {};
};

const TemplateEditor = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<TemplateType>("image");

  // Image upload
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // CSS class
  const [cssName, setCssName] = useState("");
  const [cssValue, setCssValue] = useState("");

  // Gradient builder
  const [gradName, setGradName] = useState("");
  const [gradType, setGradType] = useState<"linear" | "radial">("linear");
  const [gradAngle, setGradAngle] = useState("135");
  const [gradColor1, setGradColor1] = useState("#3b82f6");
  const [gradColor2, setGradColor2] = useState("#8b5cf6");

  const gradientCss =
    gradType === "linear"
      ? `linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})`
      : `radial-gradient(circle, ${gradColor1}, ${gradColor2})`;

  // Pattern
  const [patternName, setPatternName] = useState("");
  const [patternValue, setPatternValue] = useState(PATTERN_PRESETS[0].value);

  const fetchTemplates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("card_background_templates")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Gagal memuat template", description: error.message, variant: "destructive" });
    } else {
      setTemplates((data || []) as Template[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const insertTemplate = async (payload: {
    name: string;
    type: TemplateType;
    value: string;
    preview_url?: string | null;
    storage_path?: string | null;
  }) => {
    const { error } = await supabase.from("card_background_templates").insert(payload);
    if (error) throw error;
    toast({ title: "Template tersimpan", description: `"${payload.name}" berhasil ditambahkan.` });
    fetchTemplates();
  };

  const handleSaveImage = async () => {
    if (!imageName.trim() || !imageFile) {
      toast({ title: "Lengkapi data", description: "Nama dan file gambar wajib diisi.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const ext = imageFile.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("card-backgrounds").upload(path, imageFile);
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage.from("card-backgrounds").getPublicUrl(path);
      await insertTemplate({
        name: imageName.trim(),
        type: "image",
        value: urlData.publicUrl,
        preview_url: urlData.publicUrl,
        storage_path: path,
      });
      setImageName("");
      setImageFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (e: any) {
      toast({ title: "Gagal upload", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCss = async () => {
    if (!cssName.trim() || !cssValue.trim()) {
      toast({ title: "Lengkapi data", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await insertTemplate({ name: cssName.trim(), type: "css", value: cssValue.trim() });
      setCssName("");
      setCssValue("");
    } catch (e: any) {
      toast({ title: "Gagal simpan", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveGradient = async () => {
    if (!gradName.trim()) {
      toast({ title: "Nama gradient wajib diisi", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await insertTemplate({ name: gradName.trim(), type: "gradient", value: gradientCss });
      setGradName("");
    } catch (e: any) {
      toast({ title: "Gagal simpan", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePattern = async () => {
    if (!patternName.trim()) {
      toast({ title: "Nama pattern wajib diisi", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await insertTemplate({ name: patternName.trim(), type: "pattern", value: patternValue });
      setPatternName("");
    } catch (e: any) {
      toast({ title: "Gagal simpan", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (t: Template) => {
    if (t.storage_path) {
      await supabase.storage.from("card-backgrounds").remove([t.storage_path]);
    }
    const { error } = await supabase.from("card_background_templates").delete().eq("id", t.id);
    if (error) {
      toast({ title: "Gagal hapus", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Template dihapus" });
      fetchTemplates();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10">
      <div className="container mx-auto max-w-5xl px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Template Editor</h1>
            <p className="text-gray-500 text-sm mt-1">
              Buat template latar belakang kartu nama yang akan tersedia di langkah desain.
            </p>
          </div>
          <Link to="/order">
            <Button variant="outline">Ke Halaman Order</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Buat Template Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={(v) => setTab(v as TemplateType)}>
              <TabsList className="grid grid-cols-4 w-full mb-6">
                <TabsTrigger value="image"><ImageIcon className="w-4 h-4 mr-1" />Gambar</TabsTrigger>
                <TabsTrigger value="css"><Code2 className="w-4 h-4 mr-1" />CSS</TabsTrigger>
                <TabsTrigger value="gradient"><Palette className="w-4 h-4 mr-1" />Gradient</TabsTrigger>
                <TabsTrigger value="pattern"><Sparkles className="w-4 h-4 mr-1" />Pattern</TabsTrigger>
              </TabsList>

              {/* IMAGE */}
              <TabsContent value="image" className="space-y-3">
                <div>
                  <Label>Nama template</Label>
                  <Input value={imageName} onChange={(e) => setImageName(e.target.value)} placeholder="Contoh: Marble Hitam" />
                </div>
                <div>
                  <Label>File gambar</Label>
                  <Input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Rekomendasi: 1050x600px, max 5MB.</p>
                </div>
                {imageFile && (
                  <div className="w-full h-40 rounded-md border overflow-hidden">
                    <img src={URL.createObjectURL(imageFile)} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <Button onClick={handleSaveImage} disabled={saving} className="gap-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Upload & Simpan
                </Button>
              </TabsContent>

              {/* CSS */}
              <TabsContent value="css" className="space-y-3">
                <div>
                  <Label>Nama template</Label>
                  <Input value={cssName} onChange={(e) => setCssName(e.target.value)} placeholder="Contoh: Tailwind Sunset" />
                </div>
                <div>
                  <Label>Class Tailwind atau CSS background</Label>
                  <Input
                    value={cssValue}
                    onChange={(e) => setCssValue(e.target.value)}
                    placeholder="bg-gradient-to-r from-orange-400 to-pink-500"
                    className="font-mono"
                  />
                </div>
                {cssValue && (
                  <div className={`w-full h-32 rounded-md border ${cssValue}`} />
                )}
                <Button onClick={handleSaveCss} disabled={saving}>Simpan CSS</Button>
              </TabsContent>

              {/* GRADIENT */}
              <TabsContent value="gradient" className="space-y-3">
                <div>
                  <Label>Nama template</Label>
                  <Input value={gradName} onChange={(e) => setGradName(e.target.value)} placeholder="Contoh: Ocean Sunrise" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Tipe</Label>
                    <Select value={gradType} onValueChange={(v) => setGradType(v as any)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {gradType === "linear" && (
                    <div>
                      <Label>Sudut ({gradAngle}°)</Label>
                      <Input type="range" min="0" max="360" value={gradAngle} onChange={(e) => setGradAngle(e.target.value)} />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Warna 1</Label>
                    <Input type="color" value={gradColor1} onChange={(e) => setGradColor1(e.target.value)} className="h-10" />
                  </div>
                  <div>
                    <Label>Warna 2</Label>
                    <Input type="color" value={gradColor2} onChange={(e) => setGradColor2(e.target.value)} className="h-10" />
                  </div>
                </div>
                <div className="w-full h-32 rounded-md border" style={{ background: gradientCss }} />
                <code className="block text-xs bg-gray-100 px-2 py-1 rounded font-mono break-all">{gradientCss}</code>
                <Button onClick={handleSaveGradient} disabled={saving}>Simpan Gradient</Button>
              </TabsContent>

              {/* PATTERN */}
              <TabsContent value="pattern" className="space-y-3">
                <div>
                  <Label>Nama template</Label>
                  <Input value={patternName} onChange={(e) => setPatternName(e.target.value)} placeholder="Contoh: Dots Biru" />
                </div>
                <div>
                  <Label>Pilih pattern preset</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {PATTERN_PRESETS.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setPatternValue(p.value)}
                        className={`h-20 rounded-md border-2 transition ${
                          patternValue === p.value ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200"
                        }`}
                        style={{ background: p.value }}
                        title={p.name}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full h-32 rounded-md border" style={{ background: patternValue }} />
                <Button onClick={handleSavePattern} disabled={saving}>Simpan Pattern</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* GALLERY */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Template ({templates.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-blue-600" /></div>
            ) : templates.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Belum ada template. Buat satu di atas!</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((t) => (
                  <div key={t.id} className="relative group border rounded-lg overflow-hidden bg-white">
                    <div
                      className={`w-full h-28 ${t.type === "css" ? t.value : ""}`}
                      style={t.type !== "css" ? renderPreviewStyle(t) : undefined}
                    />
                    <div className="p-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium truncate">{t.name}</span>
                        <span className="text-[10px] uppercase bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{t.type}</span>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition"
                      onClick={() => handleDelete(t)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateEditor;
