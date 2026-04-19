import { useRef, useState } from "react";
import { clamp, rollDice, cloneStats, type Stats } from "@/lib/combatHelper";

export function useCombat() {
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
  const [fighting, setFighting] = useState(false);

  const attackerRef = useRef(attacker);
  const defenderRef = useRef(defender);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function syncAttacker(p: Stats) {
    attackerRef.current = p;
    setAttacker(p);
  }

  function syncDefender(p: Stats) {
    defenderRef.current = p;
    setDefender(p);
  }

  function addLog(parts: string[]) {
    setLog((prev) => [parts, ...prev]);
  }

  function resolveAttack(attacker: Stats, defender: Stats, label: string) {
    const rollA = rollDice();
    const rollD = rollDice();

    const atk = attacker.combat + rollA;
    const def = defender.defence + rollD;

    const hit = atk > def;
    const newDef = cloneStats(defender);

    let dmg = 0;

    if (hit) {
      dmg = Math.max(0, atk - def);
      newDef.stamina = clamp(newDef.stamina - dmg, 0, 999);
    }

    addLog([
      label,
      `${rollA}+${attacker.combat}=${atk}`,
      `${rollD}+${defender.defence}=${def}`,
      hit ? `💥 -${dmg}` : "❌",
    ]);

    return newDef;
  }

  function stop() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setFighting(false);
  }

  function simulateFight() {
    if (fighting) return;

    setFighting(true);

    intervalRef.current = setInterval(() => {
      let a = attackerRef.current;
      let d = defenderRef.current;

      d = resolveAttack(a, d, "Attacker");
      syncDefender(d);

      if (d.stamina <= 0) {
        addLog(["Defender", "defeated", "", ""]);
        stop();
        return;
      }

      a = resolveAttack(d, a, "Defender");
      syncAttacker(a);

      if (a.stamina <= 0) {
        addLog(["Attacker", "defeated", "", ""]);
        stop();
      }
    }, 1000);
  }

  const hitAdvantage = attacker.combat - defender.defence;
  const counterAdvantage = defender.combat - attacker.defence;

  const baseChance = 50 + (hitAdvantage - counterAdvantage) * 5;
  const staminaBonus = (attacker.stamina - defender.stamina) * 2;
  const chance = clamp(baseChance + staminaBonus, 5, 95);

  return {
    attacker,
    defender,
    log,
    fighting,
    chance,
    syncAttacker,
    syncDefender,
    simulateFight,
  };
}
