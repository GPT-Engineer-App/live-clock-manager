"use client";

import { useState } from "react";

interface Clock {
  id: number;
  label: string;
  timezone: string;
}

export default function Home() {
  const [clocks, setClocks] = useState<Clock[]>([]);
  const [nextId, setNextId] = useState(1);

  const addClock = () => {
    setClocks([...clocks, { id: nextId, label: "New Clock", timezone: "UTC" }]);
    setNextId(nextId + 1);
  };

  const updateClock = (id: number, updatedClock: Partial<Clock>) => {
    setClocks(clocks.map(clock => (clock.id === id ? { ...clock, ...updatedClock } : clock)));
  };

  const deleteClock = (id: number) => {
    setClocks(clocks.filter(clock => clock.id !== id));
  };

  return (
    <div>
      <button onClick={addClock} className="m-4 p-2 bg-blue-500 text-white rounded">Add Clock</button>
      <div className="clock-grid">
        {clocks.map(clock => (
          <div key={clock.id} className="clock-card">
            <input
              type="text"
              value={clock.label}
              onChange={e => updateClock(clock.id, { label: e.target.value })}
            />
            <input
              type="text"
              value={clock.timezone}
              onChange={e => updateClock(clock.id, { timezone: e.target.value })}
            />
            <button onClick={() => deleteClock(clock.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}