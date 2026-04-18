import { tagToPath } from "@/lib/formatters";
import type { TagSheet } from "@/types/TagTypes";
import Badge from "./Badge";

function TagList({ tags }: { tags: TagSheet[] }) {
  return (
    <div className="flex flex-wrap mt-2">
      {tags.map((item: TagSheet) => (
        <div key={item.tag} className="w-6 mr-1 mb-2">
          <Badge text={item.tag} link={tagToPath(item.tag)} />
        </div>
      ))}
    </div>
  );
}

export default TagList;
