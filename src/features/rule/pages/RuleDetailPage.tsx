import Card from "@/components/Card";
import { useParams } from "react-router-dom";
import { useRuleService } from "../services/RuleService";
import ListTable from "@/components/ListTable";
import { parseLinks } from "@/lib/parseLinks";
import { ParagraphImage } from "@/components/ParagraphImage";

function RuleDetail() {
  const { tag } = useParams();
  const { getRuleDataByTag } = useRuleService();
  const rule = getRuleDataByTag(tag as string);

  if (!rule) return null;

  return (
    <>
      {rule.desc && rule.desc?.length >= 1 && (
        <Card title={rule.title}>
          <div style={{ display: "flow-root" }}>
            {rule.image && (
              <ParagraphImage tag={tag as string} title={rule.title} />
            )}

            {rule.desc.map((p, i) => (
              <p key={i}>{parseLinks(p)}</p>
            ))}
          </div>
        </Card>
      )}

      {rule.tables?.map((table, index) => (
        <ListTable key={index} table={table} />
      ))}

      {rule.note && (
        <Card title="Notes">
          {rule.note?.map((p, i) => (
            <p key={i}>{parseLinks(p)}</p>
          ))}
        </Card>
      )}
    </>
  );
}

export default RuleDetail;
