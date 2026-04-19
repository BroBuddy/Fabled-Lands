import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import { useRef, useState } from "react";

type Stats = {
  combat: number;
  defence: number;
  stamina: number;
};

function rollDice(): number {
  return Math.floor(Math.random() * 12) + 1;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function cloneStats(s: Stats): Stats {
  return { ...s };
}

function CombatPage() {
  const [attacker, setAttacker] = useState<Stats>({
    combat: 6,
    defence: 8,
    stamina: 9,
  });

  const [defender, setDefender] = useState<Stats>({
    combat: 3,
    defence: 4,
    stamina: 5,
  });

  const [log, setLog] = useState<string[][]>([]);
  const [fighting, setFighting] = useState<boolean>(false);

  const attackerRef = useRef(attacker);
  const defenderRef = useRef(defender);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logTable = {
    cols: ["Combat", "⚔️", "🛡️", "💥"],
    rows: log,
  };

  function syncAttacker(p: Stats) {
    attackerRef.current = p;
    setAttacker(p);
  }

  function syncDefender(e: Stats) {
    defenderRef.current = e;
    setDefender(e);
  }

  function addLog(parts: string[]) {
    setLog((prev) => [parts, ...prev]);
  }

  function resolveAttack(attacker: Stats, defender: Stats, label: string) {
    const rollAttacker = rollDice();
    const rollDefender = rollDice();
    const attack = attacker.combat + rollAttacker;
    const defence = defender.defence + rollDefender;
    const hit = attack > defence;
    const newDef = cloneStats(defender);
    let dmg = 0;

    if (hit) {
      dmg = Math.max(0, attack - defence);
      newDef.stamina = clamp(newDef.stamina - dmg, 0, 999);
    }

    const text = hit
      ? [
          label,
          `${rollAttacker}+${attacker.combat}=${attack}`,
          `${rollDefender}+${defender.defence}=${defence}`,
          `❤️ -${dmg}`,
        ]
      : [
          label,
          `${rollAttacker}+${attacker.combat}=${attack}`,
          `${rollDefender}+${defender.defence}=${defence}`,
          "❌ Miss",
        ];

    addLog(text);

    return newDef;
  }

  function stopSim(): void {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function simulateFight(): void {
    if (fighting) return;

    setFighting(true);

    intervalRef.current = setInterval(() => {
      let player = attackerRef.current;
      let e = defenderRef.current;

      e = resolveAttack(player, e, "Attacker");
      syncDefender(e);

      if (e.stamina <= 0) {
        addLog(["Defender", "defeated", "", ""]);
        stopSim();
        return;
      }

      player = resolveAttack(e, player, "Defender");
      syncAttacker(player);

      if (player.stamina <= 0) {
        addLog(["Attacker", "defeated", "", ""]);
        stopSim();
      }
    }, 1000);
  }

  return (
    <>
      <Card title="Preperation">
        <p>
          <strong>Attacker:</strong>
        </p>

        <div className="flex flex-row gap-8">
          ⚔️
          <input
            type="number"
            value={attacker.combat}
            className="w-5"
            disabled={fighting}
            onChange={(e) =>
              syncAttacker({ ...attacker, combat: Number(e.target.value) })
            }
          />
          🛡️
          <input
            type="number"
            value={attacker.defence}
            className="w-5"
            disabled={fighting}
            onChange={(e) =>
              syncAttacker({ ...attacker, defence: Number(e.target.value) })
            }
          />
          {attacker.stamina == 0 ? "💀" : "❤️"}
          <input
            type="number"
            value={attacker.stamina}
            className="w-5"
            disabled={fighting}
            onChange={(e) =>
              syncAttacker({ ...attacker, stamina: Number(e.target.value) })
            }
          />
        </div>

        <p className="pt-3">
          <strong>Defender:</strong>
        </p>

        <div className="flex flex-row gap-8 mb-2">
          ⚔️
          <input
            type="number"
            value={defender.combat}
            className="w-5"
            disabled={fighting}
            onChange={(e) =>
              syncDefender({ ...defender, combat: Number(e.target.value) })
            }
          />
          🛡️
          <input
            type="number"
            value={defender.defence}
            className="w-5"
            disabled={fighting}
            onChange={(e) =>
              syncDefender({ ...defender, defence: Number(e.target.value) })
            }
          />
          {defender.stamina == 0 ? "☠️" : "❤️"}
          <input
            type="number"
            value={defender.stamina}
            className="w-5"
            disabled={fighting}
            onChange={(e) =>
              syncDefender({ ...defender, stamina: Number(e.target.value) })
            }
          />
        </div>
      </Card>

      {!fighting && (
        <Card title="Combat">
          <button onClick={simulateFight} className="m-1">
            Fight
          </button>
        </Card>
      )}

      {fighting && log.length > 0 && <ListTable table={logTable} />}
    </>
  );
}
export default CombatPage;
