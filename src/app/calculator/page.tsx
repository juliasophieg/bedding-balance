"use client";
import { useEffect, useState } from "react";

type Horse = {
  stall: string;
  name: string;
  torv: number;
  torvMix: number;
  pellets: number;
};

type Summary = {
  totalTorv: number;
  totalTorvMix: number;
  totalPellets: number;
  torvPackages: number;
  torvMixPackages: number;
  pelletsPackages: number;
  suggestions: string[];
};

export default function Calculate() {
  const [horses, setHorses] = useState<Horse[]>([
    {
      stall: "Box 1",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Box 2",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Box 3",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Box 4",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Box 5",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Box 6",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Box 7",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Box 8",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Utebox 1",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Utebox 2",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Utebox 3",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
    {
      stall: "Utebox 4",
      name: "",
      torv: 0,
      torvMix: 0,
      pellets: 0,
    },
  ]);

  const [summary, setSummary] = useState<Summary>({
    totalTorv: 0,
    totalTorvMix: 0,
    totalPellets: 0,
    torvPackages: 0,
    torvMixPackages: 0,
    pelletsPackages: 0,
    suggestions: [],
  });

  const TORV_PER_PACKAGE: number = 18;
  const TORVMIX_PER_PACKAGE: number = 18;
  const PELLETS_PER_PACKAGE: number = 52;

  const updateHorse = (
    index: number,
    field: keyof Horse,
    value: string | number
  ) => {
    if (field === "stall") {
      return;
    }
    const newHorses = [...horses];
    if (field === "name") {
      newHorses[index][field] = value as string;
    } else {
      newHorses[index][field] = Math.max(0, Number(value));
    }
    setHorses(newHorses);
  };

  useEffect(() => {
    const totalTorv = horses.reduce((sum, horse) => sum + horse.torv, 0);
    const totalTorvMix = horses.reduce((sum, horse) => sum + horse.torvMix, 0);
    const totalPellets = horses.reduce((sum, horse) => sum + horse.pellets, 0);

    const torvPackages = Math.ceil(totalTorv / TORV_PER_PACKAGE);
    const torvMixPackages = Math.ceil(totalTorvMix / TORVMIX_PER_PACKAGE);
    const pelletsPackages = Math.ceil(totalPellets / PELLETS_PER_PACKAGE);

    const suggestions: string[] = [];

    const torvRemainder = torvPackages * TORV_PER_PACKAGE - totalTorv;
    const torvMixRemainder =
      torvMixPackages * TORVMIX_PER_PACKAGE - totalTorvMix;
    const pelletsRemainder =
      pelletsPackages * PELLETS_PER_PACKAGE - totalPellets;

    if (torvRemainder > 0) {
      suggestions.push(
        `Det behövs  ${torvRemainder} mer torv för en hell pall`
      );
    }
    if (torvMixRemainder > 0) {
      suggestions.push(
        `Det behövs ${torvMixRemainder} mer torvmix för en hel pall`
      );
    }
    if (pelletsRemainder > 0) {
      suggestions.push(
        `Det behövs ${pelletsRemainder} mer pellets för en hel pall`
      );
    }
    setSummary({
      totalTorv,
      totalTorvMix,
      totalPellets,
      torvPackages,
      torvMixPackages,
      pelletsPackages,
      suggestions,
    });
  }, [horses]);

  return (
    <>
      <div className="w-full flex p-10 gap-4">
        <table className="w-2/3 border-separate border-spacing-y-3 text-left">
          <thead>
            <tr>
              <th>Box</th>
              <th>Häst</th>
              <th>Torv</th>
              <th>Torvmix</th>
              <th>Pellets</th>
            </tr>
          </thead>
          <tbody>
            {horses.map((horse, index) => (
              <tr key={horse.stall}>
                <td>{horse.stall}</td>
                <td>
                  <input
                    className="border rounded px-2 w-28"
                    type="text"
                    placeholder="Häst"
                    value={horse.name}
                    onChange={(e) => updateHorse(index, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="border rounded w-16"
                    type="number"
                    onChange={(e) => updateHorse(index, "torv", e.target.value)}
                    min={0}
                  />
                </td>
                <td>
                  <input
                    className="border rounded w-16"
                    type="number"
                    onChange={(e) =>
                      updateHorse(index, "torvMix", e.target.value)
                    }
                    min={0}
                  />
                </td>
                <td>
                  <input
                    className="border rounded w-16"
                    type="number"
                    onChange={(e) =>
                      updateHorse(index, "pellets", e.target.value)
                    }
                    min={0}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-1/3">
          <h2 className="font-semibold">Sammanfattning</h2>
          <div>
            <div>
              <p>Total torv: {summary.totalTorv}</p>
              <p>Pallar: {summary.torvPackages}</p>
            </div>
            <div>
              <p>Total torvmix: {summary.totalTorvMix}</p>
              <p>Pallar: {summary.torvMixPackages}</p>
            </div>
            <div>
              <p>Total pellets: {summary.totalPellets}</p>
              <p>Pallar: {summary.pelletsPackages}</p>
            </div>
          </div>

          {/* <h3 className="font-semibold mb-2">Förslag på justeringar:</h3> */}
          {summary.suggestions.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <ul className="list-disc pl-4">
                {summary.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
          <button className="bg-yellow-500">Exportera uträkning</button>
        </div>
      </div>
    </>
  );
}
