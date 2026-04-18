type TagItem = {
  id?: string;
  tag?: string;
  title: string;
  content: string;
  time?: string;
  image?: string;
};

type TagOption = {
  value: string;
  label: string;
};

type TagSheet = {
  tag: string;
  title: string;
};

export type { TagItem, TagOption, TagSheet };
