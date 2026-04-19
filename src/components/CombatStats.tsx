import type { Stats } from "@/lib/combatHelper";

type Props = {
  title: string;
  stats: Stats;
  setStats: (s: Stats) => void;
  disabled: boolean;
};

function CombatStats({ title, stats, setStats, disabled }: Props) {
  return (
    <>
      <p>
        <strong>{title}:</strong>
      </p>

      <div className="flex flex-row gap-8 pb-3">
        ⚔️
        <input
          type="number"
          value={stats.combat}
          className="w-5"
          disabled={disabled}
          onChange={(e) =>
            setStats({ ...stats, combat: Number(e.target.value) })
          }
        />
        🛡️
        <input
          type="number"
          value={stats.defence}
          className="w-5"
          disabled={disabled}
          onChange={(e) =>
            setStats({ ...stats, defence: Number(e.target.value) })
          }
        />
        {stats.stamina === 0 ? "☠️" : "❤️"}
        <input
          type="number"
          value={stats.stamina}
          className="w-5"
          disabled={disabled}
          onChange={(e) =>
            setStats({ ...stats, stamina: Number(e.target.value) })
          }
        />
      </div>
    </>
  );
}

export default CombatStats;
