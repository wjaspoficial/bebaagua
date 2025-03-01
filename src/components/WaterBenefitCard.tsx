
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from 'lucide-react';

interface WaterBenefitCardProps {
  benefit: string;
}

const WaterBenefitCard = ({ benefit }: WaterBenefitCardProps) => {
  return (
    <Card className="mt-6 bg-blue-50/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          Benefício de se manter hidratado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{benefit}</p>
      </CardContent>
    </Card>
  );
};

export default WaterBenefitCard;
