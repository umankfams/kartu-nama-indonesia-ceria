
const backgroundOptions = [
  { value: "solid-dark", label: "Solid Dark", description: "Hitam klasik profesional" },
  { value: "gradient-blue", label: "Gradient Biru", description: "Gradasi biru modern" },
  { value: "gradient-purple", label: "Gradient Ungu", description: "Gradasi ungu elegan" },
  { value: "minimal-white", label: "Minimal Putih", description: "Putih bersih minimalis" },
  { value: "geometric", label: "Pola Geometris", description: "Pola geometris modern" },
  { value: "texture-paper", label: "Tekstur Kertas", description: "Tekstur kertas alami" },
  { value: "custom", label: "Upload Gambar", description: "Gunakan gambar sendiri" }
];

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

export {
  backgroundOptions,
  bahanOptions,
  finishingOptions,
  jumlahOptions
};
