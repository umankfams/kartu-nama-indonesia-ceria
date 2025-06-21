
const backgroundOptions = [
  {
    value: "solid-dark",
    label: "Solid Dark",
    description: "Hitam klasik profesional",
    className: "bg-gradient-to-br from-gray-900 to-gray-700"
  },
  {
    value: "gradient-blue",
    label: "Gradient Biru",
    description: "Gradasi biru modern",
    className: "bg-gradient-to-br from-blue-600 to-blue-800"
  },
  {
    value: "gradient-purple",
    label: "Gradient Ungu",
    description: "Gradasi ungu elegan",
    className: "bg-gradient-to-br from-purple-600 to-purple-800"
  },
  {
    value: "minimal-white",
    label: "Minimal Putih",
    description: "Putih bersih minimalis",
    className: "bg-white border-2 border-gray-200 text-gray-900"
  },
  {
    value: "geometric",
    label: "Pola Geometris",
    description: "Pola geometris modern",
    className: "bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden"
  },
  {
    value: "texture-paper",
    label: "Tekstur Kertas",
    description: "Tekstur kertas alami",
    className: "bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 text-gray-800"
  },
  {
    value: "texture-zigzag",
    label: "Tekstur Zigzag",
    description: "Tekstur kertas alami",
    className: "background-color: #e5e5f7;
opacity: 0.8;
background-image:  linear-gradient(135deg, #444cf7 25%, transparent 25%), linear-gradient(225deg, #444cf7 25%, transparent 25%), linear-gradient(45deg, #444cf7 25%, transparent 25%), linear-gradient(315deg, #444cf7 25%, #e5e5f7 25%);
background-position:  10px 0, 10px 0, 0 0, 0 0;
background-size: 20px 20px;
background-repeat: repeat;"
  },
  {
    value: "custom",
    label: "Upload Gambar",
    description: "Gunakan gambar sendiri",
    className: "bg-cover bg-center bg-no-repeat"
  }
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
