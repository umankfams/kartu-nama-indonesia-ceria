const STEP_TITLES = [
  "Informasi Pribadi",
  "Desain Kartu",
  "Spesifikasi Kartu",
  "Info Pengiriman",
  "Opsi Pembayaran"
];

type Props = {
  currentStep: number;
};

const OrderProgressBar = ({ currentStep }: Props) => (
  <div className="container mx-auto px-4 py-6">
    <div className="flex items-center gap-2 justify-center md:justify-start">
      {STEP_TITLES.map((title, idx) => (
        <div key={title} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors
              ${idx === currentStep
                ? "bg-blue-600 text-white"
                : idx < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
          >
            {idx + 1}
          </div>
          <span
            className={`hidden md:inline-block transition-colors text-sm font-medium 
              ${idx === currentStep ? "text-blue-600" : "text-gray-500"}`}
          >
            {title}
          </span>
          {idx < STEP_TITLES.length - 1 && (
            <span className="w-6 h-1 bg-gray-300 rounded-full"></span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default OrderProgressBar;
