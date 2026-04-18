import styles from "./Card.module.scss";

type CardProps = {
  title?: string;
  children: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
  return (
    <div className={styles.card}>
      {title && <div className={styles.cardHeader}>{title}</div>}

      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};

export default Card;
