import Card from "@/components/Card";
import CombatStats from "@/components/CombatStats";
import ListTable from "@/components/ListTable";
import { useCombat } from "@/hooks/useCombat";

function CombatPage() {
  const {
    attacker,
    defender,
    log,
    fighting,
    chance,
    syncAttacker,
    syncDefender,
    simulateFight,
  } = useCombat();

  const logTable = {
    cols: ["Combat", "⚔️", "🛡️", "💥"],
    rows: log,
  };

  return (
    <>
      <Card title="Preperation">
        <CombatStats
          title="Attacker"
          stats={attacker}
          setStats={syncAttacker}
          disabled={fighting}
        />

        <CombatStats
          title="Defender"
          stats={defender}
          setStats={syncDefender}
          disabled={fighting}
        />

        {log.length == 0 && (
          <>
            <p>
              <strong>Chance: {chance}%</strong>
            </p>

            <button onClick={simulateFight} className="m-1">
              Fight
            </button>
          </>
        )}
      </Card>

      {log.length > 0 && <ListTable table={logTable} />}
    </>
  );
}
export default CombatPage;
