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

function CodewordsPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("fabled-lands-codewords");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const saved = localStorage.getItem("fabled-lands-codewords");
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fabled-lands-codewords", JSON.stringify(checked));
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
            className="flex w-10 mr-2 mb-2 gap-3 pointer"
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
