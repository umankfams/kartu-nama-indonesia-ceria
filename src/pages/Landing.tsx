
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Shield, Truck, Users, CheckCircle, Phone, Mail, MapPin, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const packages = [
    {
      name: "Basic",
      price: "150.000",
      features: [
        "Art Paper 260gsm",
        "500 pcs kartu nama",
        "Desain 1 sisi",
        "Revisi 2x",
        "Gratis ongkir Jabodetabek"
      ]
    },
    {
      name: "Premium",
      price: "250.000",
      features: [
        "Ivory 280gsm",
        "1000 pcs kartu nama",
        "Desain 2 sisi",
        "UV Spot finishing",
        "Revisi unlimited",
        "Gratis ongkir se-Indonesia"
      ],
      popular: true
    },
    {
      name: "Deluxe",
      price: "400.000",
      features: [
        "Linen 300gsm",
        "2000 pcs kartu nama",
        "Desain premium 2 sisi",
        "Emboss + UV Spot",
        "Revisi unlimited",
        "Express 3 hari"
      ]
    }
  ];

  const workProcess = [
    {
      step: "1",
      title: "Pesan & Bayar Online",
      description: "Isi form pemesanan dan lakukan pembayaran melalui transfer bank atau e-wallet"
    },
    {
      step: "2",
      title: "Cek desain dari desainer",
      description: "Tim desainer profesional kami akan membuat desain sesuai kebutuhan Anda"
    },
    {
      step: "3",
      title: "Terima Kartu Nama Jadi",
      description: "Kartu nama akan dicetak dan dikirim ke alamat Anda dalam 3-5 hari kerja"
    }
  ];

  const advantages = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Kualitas Terjamin",
      description: "Menggunakan bahan premium dan mesin cetak offset terbaru untuk hasil berkualitas tinggi"
    },
    {
      icon: <Truck className="w-8 h-8 text-green-600" />,
      title: "Pengiriman Cepat",
      description: "Proses produksi 3-5 hari kerja dengan pengiriman ke seluruh Indonesia"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Tim Profesional",
      description: "Didukung tim desainer berpengalaman untuk hasil desain yang memukau"
    },
    {
      icon: <Star className="w-8 h-8 text-orange-600" />,
      title: "Harga Bersaing",
      description: "Harga terbaik dengan kualitas premium, tanpa biaya tersembunyi"
    }
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      position: "CEO Startup Tech",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "Kualitas kartu nama sangat bagus dan pelayanannya memuaskan. Desainernya juga sangat membantu dalam memberikan saran."
    },
    {
      name: "Sari Indah",
      position: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b74e55a3?w=100&h=100&fit=crop&crop=face",
      text: "Proses pemesanan mudah dan hasilnya sesuai ekspektasi. Pengiriman juga cepat, pasti akan pesan lagi."
    },
    {
      name: "Ahmad Rizki",
      position: "Business Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "Sangat puas dengan hasilnya! Kartu nama terlihat profesional dan berkualitas tinggi. Recommended!"
    }
  ];

  const faqs = [
    {
      question: "Berapa lama waktu pengerjaan?",
      answer: "Waktu pengerjaan standar adalah 3-5 hari kerja setelah desain final disetujui. Untuk paket express, kami bisa selesaikan dalam 1-2 hari kerja."
    },
    {
      question: "Bisa kirim ke luar kota?",
      answer: "Ya, kami melayani pengiriman ke seluruh Indonesia. Biaya ongkir sudah termasuk untuk paket Premium dan Deluxe."
    },
    {
      question: "Apakah bisa revisi desain?",
      answer: "Ya, setiap paket sudah termasuk revisi. Paket Basic 2x revisi, sedangkan Premium dan Deluxe unlimited revisi hingga Anda puas."
    },
    {
      question: "Apa saja metode pembayaran?",
      answer: "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (OVO, GoPay, DANA), dan QRIS."
    },
    {
      question: "Apakah ada garansi kualitas?",
      answer: "Ya, kami memberikan garansi 100% uang kembali jika hasil tidak sesuai dengan yang dijanjikan atau ada cacat produksi."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">Kartunama</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#beranda" className="text-gray-600 hover:text-blue-600 transition-colors">Beranda</a>
              <a href="#paket" className="text-gray-600 hover:text-blue-600 transition-colors">Paket</a>
              <a href="#cara-kerja" className="text-gray-600 hover:text-blue-600 transition-colors">Cara Kerja</a>
              <a href="#kontak" className="text-gray-600 hover:text-blue-600 transition-colors">Kontak</a>
            </nav>
            <Button 
              onClick={() => navigate('/order')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Pesan Sekarang
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom duration-1000">
                Cetak Kartu Nama Tercepat & Termudah
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 animate-in slide-in-from-bottom duration-1000 delay-200">
                Minimal 2 Boxes, 2 Jam Selesai*
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom duration-1000 delay-400">
                <Button 
                  size="lg"
                  onClick={() => navigate('/order')}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4"
                >
                  Pesan Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-4"
                >
                  Lihat Contoh
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-80">*Syarat dan ketentuan berlaku</p>
            </div>
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop" 
                  alt="Business Cards"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-semibold text-sm animate-bounce">
                  Best Seller!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-600">Dipercaya oleh 10,000+ perusahaan</p>
          </div>
          <div className="flex justify-center items-center gap-8 opacity-60 flex-wrap">
            {/* Placeholder logos */}
            <div className="w-20 h-12 bg-gray-300 rounded flex items-center justify-center text-xs">Logo 1</div>
            <div className="w-20 h-12 bg-gray-300 rounded flex items-center justify-center text-xs">Logo 2</div>
            <div className="w-20 h-12 bg-gray-300 rounded flex items-center justify-center text-xs">Logo 3</div>
            <div className="w-20 h-12 bg-gray-300 rounded flex items-center justify-center text-xs">Logo 4</div>
            <div className="w-20 h-12 bg-gray-300 rounded flex items-center justify-center text-xs">Logo 5</div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kartu Nama Adalah Kunci Pertama Bisnis Anda
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Satu kartu nama yang berkualitas dapat membuka ribuan peluang bisnis baru dan membangun kredibilitas profesional Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-0">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {advantage.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                  <p className="text-sm text-gray-600">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="paket" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pilih Tipe Kartu Nama Sesuai dengan Kebutuhan Anda
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative p-8 ${pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''} hover:shadow-xl transition-all duration-300`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                    Paling Populer
                  </Badge>
                )}
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-blue-600">
                      Rp {pkg.price}
                      <span className="text-sm text-gray-500 font-normal">/paket</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full"
                    onClick={() => navigate('/order')}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    Pilih Paket Ini
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="cara-kerja" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cara Kerja Kami
            </h2>
            <p className="text-xl text-gray-600">
              Proses mudah dalam 3 langkah sederhana
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {workProcess.map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
                {index < workProcess.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-6 h-6 text-gray-400" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => navigate('/order')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
            >
              Mulai Pesan Sekarang
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Startup Founder Menyukai Kartunama.net
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              FAQ Buat Kartu Nama di Kartunama.net
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-700">
                <button
                  className="w-full py-6 text-left flex items-center justify-between hover:text-blue-300 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="pb-6 text-gray-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => navigate('/order')}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
            >
              Mulai Cetak
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold">Kartunama</span>
              </div>
              <p className="text-gray-400 mb-4">
                Solusi terpercaya untuk kebutuhan percetakan kartu nama berkualitas tinggi dengan harga terjangkau.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-xs">FB</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-xs">IG</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-xs">WA</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Cetak Kartu Nama</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Desain Custom</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Express Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bulk Order</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>info@kartunama.net</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kartunama.net. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
