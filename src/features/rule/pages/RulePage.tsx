import TagList from "@/components/TagList";
import { useRuleService } from "../services/RuleService";
import Card from "@/components/Card";

function RulePage() {
  const { getRuleData } = useRuleService();
  const data = getRuleData();

  return (
    <Card title="Rules">
      <TagList tags={data} />
    </Card>
  );
}

export default RulePage;
