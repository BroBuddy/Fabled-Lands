import type { Rule, RuleItem } from "../types/RuleType";
import ruleData from "../data/ruleData";

export function useRuleService() {
  const getRuleData = (): RuleItem[] => {
    if (!ruleData) return [];
    return ruleData.map(({ tag, title }) => ({ tag, title }));
  };

  const getRuleDataByTag = (tag: string): Rule | undefined => {
    return ruleData.find((item: Rule) => item.tag === tag) as Rule;
  };

  return { getRuleData, getRuleDataByTag };
}
