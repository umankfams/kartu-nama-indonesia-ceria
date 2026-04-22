import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import OrderStep1Personal from "./OrderStep1Personal";
import OrderStep2Design from "./OrderStep2Design";
import OrderStep3Specification from "./OrderStep3Specification";
import OrderStep4Shipping from "./OrderStep4Shipping";
import OrderStep5Payment from "./OrderStep5Payment";

import {
  backgroundOptions as defaultBackgroundOptions,
  bahanOptions,
  finishingOptions,
  jumlahOptions,
} from "@/utils/Options";

type Props = {
  formData: any;
  currentStep: number;
  onStepChange: (step: number) => void;
  handleInputChange: (field: string, value: string) => void;
  handleImageUpload: (field: string, file: File) => void;
  onSubmit: (e: React.FormEvent) => void;
  backgroundOptions?: any[];
};

const TOTAL_STEPS = 5;

const OrderFormSection = ({
  formData,
  currentStep,
  onStepChange,
  handleInputChange,
  handleImageUpload,
  onSubmit,
  backgroundOptions = defaultBackgroundOptions,
}: Props) => {
  const stepComponents = [
    <OrderStep1Personal key="step1" formData={formData} handleInputChange={handleInputChange} />,
    <OrderStep2Design
      key="step2"
      formData={formData}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      backgroundOptions={backgroundOptions}
    />,
    <OrderStep3Specification
      key="step3"
      formData={formData}
      handleInputChange={handleInputChange}
      bahanOptions={bahanOptions}
      finishingOptions={finishingOptions}
      jumlahOptions={jumlahOptions}
    />,
    <OrderStep4Shipping key="step4" formData={formData} handleInputChange={handleInputChange} />,
    <OrderStep5Payment key="step5" formData={formData} handleInputChange={handleInputChange} />,
  ];

  return (
    <form onSubmit={onSubmit}>
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur p-8">
        <div className="space-y-6">
          {stepComponents[currentStep]}
        </div>
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="ghost"
            disabled={currentStep === 0}
            onClick={() => onStepChange(Math.max(currentStep - 1, 0))}
          >
            Kembali
          </Button>
          {currentStep < TOTAL_STEPS - 1 ? (
            <Button
              type="button"
              onClick={() => onStepChange(Math.min(currentStep + 1, TOTAL_STEPS - 1))}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              Lanjutkan
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              Kirim Pesanan & Dapatkan Penawaran
            </Button>
          )}
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          * Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi pesanan dan pembayaran
        </p>
      </Card>
    </form>
  );
};

export default OrderFormSection;
