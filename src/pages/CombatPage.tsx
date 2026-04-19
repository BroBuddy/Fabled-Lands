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
  const [player, setPlayer] = useState<Stats>({
    combat: 6,
    defence: 8,
    stamina: 9,
  });

  const [enemy, setEnemy] = useState<Stats>({
    combat: 3,
    defence: 4,
    stamina: 5,
  });

  const [log, setLog] = useState<string[][]>([]);
  const [fighting, setFighting] = useState<boolean>(false);

  const playerRef = useRef(player);
  const enemyRef = useRef(enemy);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logTable = {
    cols: ["Combat", "⚔️", "🛡️", "💥"],
    rows: log,
  };

  function syncPlayer(p: Stats) {
    playerRef.current = p;
    setPlayer(p);
  }

  function syncEnemy(e: Stats) {
    enemyRef.current = e;
    setEnemy(e);
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
      let player = playerRef.current;
      let e = enemyRef.current;

      e = resolveAttack(player, e, "Player");
      syncEnemy(e);

      if (e.stamina <= 0) {
        addLog(["Enemy", "defeated", "", ""]);
        stopSim();
        return;
      }

      player = resolveAttack(e, player, "Enemy");
      syncPlayer(player);

      if (player.stamina <= 0) {
        addLog(["Player", "defeated", "", ""]);
        stopSim();
      }
    }, 1000);
  }

  return (
    <>
      <div className="flex flex-row">
        <Card title="Player">
          <div className="flex flex-col gap-8 mx-6">
            <div className="flex flex-row gap-8">
              ⚔️{" "}
              <input
                type="number"
                value={player.combat}
                className="w-5"
                disabled={fighting}
                onChange={(e) =>
                  syncPlayer({ ...player, combat: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex flex-row gap-8">
              🛡️
              <input
                type="number"
                value={player.defence}
                className="w-5"
                disabled={fighting}
                onChange={(e) =>
                  syncPlayer({ ...player, defence: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex flex-row gap-8 mb-2">
              {player.stamina == 0 ? "💀" : "❤️"}

              <input
                type="number"
                value={player.stamina}
                className="w-5"
                disabled={fighting}
                onChange={(e) =>
                  syncPlayer({ ...player, stamina: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </Card>

        <Card title="Enemy">
          <div className="flex flex-col gap-8 mx-6">
            <div className="flex flex-row gap-8">
              ⚔️
              <input
                type="number"
                value={enemy.combat}
                className="w-5"
                disabled={fighting}
                onChange={(e) =>
                  syncEnemy({ ...enemy, combat: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex flex-row gap-8">
              🛡️
              <input
                type="number"
                value={enemy.defence}
                className="w-5"
                disabled={fighting}
                onChange={(e) =>
                  syncEnemy({ ...enemy, defence: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex flex-row gap-8 mb-2">
              {enemy.stamina == 0 ? "☠️" : "❤️"}

              <input
                type="number"
                value={enemy.stamina}
                className="w-5"
                disabled={fighting}
                onChange={(e) =>
                  syncEnemy({ ...enemy, stamina: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </Card>
      </div>

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
