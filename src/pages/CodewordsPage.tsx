import Card from "@/components/Card";
import { CheckSquare, Square } from "lucide-react";
import { useEffect, useState } from "react";

const CODEWORDS: string[] = [
  "Acid",
  "Anvil",
  "Afraid",
  "Apache",
  "Ague",
  "Appease",
  "Aid",
  "Apple",
  "Aklar",
  "Ark",
  "Alissia",
  "Armour",
  "Almanac",
  "Artefact",
  "Aloft",
  "Artery",
  "Altitude",
  "Ashen",
  "Altruist",
  "Aspen",
  "Ambuscade",
  "Assassin",
  "Amcha",
  "Assault",
  "Amends",
  "Assist",
  "Anchor",
  "Attar",
  "Anger",
  "Avenge",
  "Animal",
  "Axe",
  "Anthem",
  "Azure",
];

const STORAGE_KEY = "fabled-lands-codewords";

function CodewordsPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};

    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleCodeword = (word: string) => {
    setChecked((prev) => ({
      ...prev,
      [word]: !prev[word],
    }));
  };

  return (
    <Card title="Codewords">
      <div className="flex flex-row flex-wrap">
        {CODEWORDS.map((word: string) => (
          <label
            key={word}
            className="flex w-12 mr-2 mb-2 gap-3 pointer"
            onClick={() => toggleCodeword(word)}
          >
            {checked[word] ? <CheckSquare /> : <Square />}
            {word}
          </label>
        ))}
      </div>
    </Card>
  );
}

export default CodewordsPage;
