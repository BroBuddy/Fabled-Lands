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
    syncAttacker,
    syncDefender,
    simulateFight,
  } = useCombat();

  const logTable = {
    cols: ["Turns", "⚔️", "🛡️", "💥"],
    rows: log,
  };

  return (
    <>
      <Card title="COMBAT">
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
          <button onClick={simulateFight} className="m-1">
            Fight
          </button>
        )}
      </Card>

      {log.length > 0 && <ListTable table={logTable} />}
    </>
  );
}
export default CombatPage;
