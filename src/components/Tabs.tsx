import { useState, type ReactNode } from "react";
import styles from "./Tabs.module.scss";

export type TabItem = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((tab: TabItem, index: number) => (
          <span
            key={tab.label}
            className={`p-1 ${index === activeIndex ? styles.active : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </span>
        ))}
      </div>

      <div className="py-2">{tabs[activeIndex]?.content}</div>
    </>
  );
};

export default Tabs;
