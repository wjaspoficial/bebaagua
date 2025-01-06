import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, X } from 'lucide-react';

interface TimeSelectorProps {
  reminders: string[];
  setReminders: (times: string[]) => void;
}

const TimeSelector = ({ reminders, setReminders }: TimeSelectorProps) => {
  const [newTime, setNewTime] = useState("");

  const addReminder = () => {
    if (newTime && !reminders.includes(newTime)) {
      setReminders([...reminders, newTime]);
      setNewTime("");
    }
  };

  const removeReminder = (time: string) => {
    setReminders(reminders.filter(t => t !== time));
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Horários dos Lembretes</h2>
      
      <div className="flex space-x-2">
        <Input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addReminder}>
          <Bell className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      </div>

      <div className="space-y-2">
        {reminders.map((time) => (
          <div key={time} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-blue-500" />
              <span>{time}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeReminder(time)}>
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;