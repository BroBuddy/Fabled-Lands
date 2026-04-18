export interface Rule {
  tag: string;
  title: string;
  image?: boolean;
  desc?: string[];
  note?: string[];
  tables?: TableType[];
}

export type RuleItem = Pick<Rule, "tag" | "title">;

export type TableType = {
  label?: string;
  cols: string[];
  rows: string[][];
};
