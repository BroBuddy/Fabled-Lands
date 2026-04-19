import { Square } from "lucide-react";
import styles from "./Card.module.scss";

type CardProps = {
  title?: string;
  ticks?: number;
  children: React.ReactNode;
};

const Card = ({ title, ticks, children }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {title}

        {ticks && (
          <div className={styles.ticks}>
            {Array.from({ length: ticks }).map((_, i) => (
              <Square key={i} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};

export default Card;
