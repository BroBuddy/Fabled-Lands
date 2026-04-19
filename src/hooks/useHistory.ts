import type { TagItem } from "@/types/TagTypes";

export const useHistory = () => {
  const storage: string = "fabled-lands";

  const addToHistory = (tag: string, title: string) => {
    const history = JSON.parse(localStorage.getItem(storage) || "[]");
    const filtered = history.filter((item: TagItem) => item.tag !== tag);
    const updated = [{ tag, title }, ...filtered].slice(0, 20);
    localStorage.setItem(storage, JSON.stringify(updated));
  };

  const getHistory = () => {
    return JSON.parse(localStorage.getItem(storage) || "[]");
  };

  return { addToHistory, getHistory };
};
