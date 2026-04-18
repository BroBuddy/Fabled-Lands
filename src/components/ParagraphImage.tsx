type ParagraphImageProps = {
  tag: string;
  title: string;
  size?: number;
};

export const ParagraphImage = ({ tag, title }: ParagraphImageProps) => (
  <img
    src={`/images/${tag}.png`}
    alt={title}
    style={{
      float: "right",
      width: "120px",
      height: "120px",
      objectFit: "cover",
      border: "1px solid #000",
      margin: "0 0 10px 10px",
    }}
  />
);
