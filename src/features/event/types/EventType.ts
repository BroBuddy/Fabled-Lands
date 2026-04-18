import type { TableType } from "@/features/rule/types/RuleType";

export interface Event {
  tag: string;
  title: string;
  desc?: string[];
  note?: string[];
  tables?: TableType[];
}

export type EventItem = Pick<Event, "tag" | "title">;
