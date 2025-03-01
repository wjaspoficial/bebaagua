
import React, { useState, useEffect } from 'react';
import { Bell, Plus, Minus, GlassWater } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import TimeSelector from './TimeSelector';
import WaterCounter from './WaterCounter';
import WaterBenefitCard from './WaterBenefitCard';

const WaterReminder = () => {
  const [waterCount, setWaterCount] = useState(0);
  const [reminders, setReminders] = useState<string[]>([]);
  const [currentBenefit, setCurrentBenefit] = useState("");
  const { toast } = useToast();

  // Lista de benefícios de beber água
  const waterBenefits = [
    "Ajuda a regular a temperatura corporal.",
    "Mantém as articulações lubrificadas.",
    "Previne infecções, mantendo os órgãos funcionando adequadamente.",
    "Melhora a qualidade do sono, humor e cognição.",
    "Ajuda na digestão e previne a constipação.",
    "Hidrata a pele, melhorando sua aparência.",
    "Auxilia os rins a eliminar toxinas do corpo.",
    "Aumenta a energia e reduz a fadiga.",
    "Pode ajudar a perder peso."
  ];

  // Escolha um benefício aleatório quando o componente for montado
  useEffect(() => {
    setCurrentBenefit(waterBenefits[Math.floor(Math.random() * waterBenefits.length)]);
  }, []);

  useEffect(() => {
    console.log('Lembretes configurados:', reminders); // Log para debug

    const checkTime = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      
      console.log('Hora atual:', currentTime); // Log para debug

      if (reminders.includes(currentTime)) {
        console.log('Horário encontrado! Tocando som de alerta...'); // Log para debug
        
        // Toca o novo som de alerta
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3');
        audio.play().catch(error => console.log('Erro ao tocar som:', error));

        toast({
          title: "Hora de beber água! 💧",
          description: "Mantenha-se hidratado para uma vida mais saudável!",
        });
      }
    };

    // Checa a cada 30 segundos para não perder o horário exato
    const interval = setInterval(checkTime, 30000);
    
    // Checa imediatamente ao montar o componente
    checkTime();

    return () => clearInterval(interval);
  }, [reminders, toast]);

  const addWater = () => {
    setWaterCount(prev => prev + 1);
    // Mostra um novo benefício aleatório cada vez que adiciona água
    setCurrentBenefit(waterBenefits[Math.floor(Math.random() * waterBenefits.length)]);
    toast({
      title: "Muito bem! 🎉",
      description: "Continue assim, mantenha-se hidratado!",
    });
  };

  const removeWater = () => {
    setWaterCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6 border-4 border-primary rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/ee6ed223-7a60-4f4c-8404-71b797976840.png" 
          alt="Astra Digitals Logo" 
          className="w-64 mb-4"
        />
        <h1 className="text-3xl font-bold text-blue-500">Beba Água</h1>
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        <WaterCounter count={waterCount} onAdd={addWater} onRemove={removeWater} />
        
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">Copos de água hoje</p>
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="icon" onClick={removeWater}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-4xl font-bold text-blue-500">{waterCount}</span>
            <Button variant="outline" size="icon" onClick={addWater}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <TimeSelector reminders={reminders} setReminders={setReminders} />

      {/* Card de benefícios que aparece quando o contador é maior que zero */}
      {waterCount > 0 && (
        <WaterBenefitCard benefit={currentBenefit} />
      )}
    </div>
  );
};

export default WaterReminder;
