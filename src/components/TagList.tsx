import { tagToPath } from "@/lib/formatters";
import type { TagSheet } from "@/types/TagTypes";
import { Link } from "react-router-dom";

function TagList({ tags }: { tags: TagSheet[] }) {
  return (
    <div className="flex flex-col gap-5">
      {tags.map((item: TagSheet, index: number) => (
        <div key={index} className="flex flex-row gap-5">
          <span className="w-5">
            <Link to={tagToPath(item.tag)}>{item.tag}</Link>
          </span>
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default TagList;
