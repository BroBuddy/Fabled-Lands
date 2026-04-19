import Card from "@/components/Card";
import TagList from "@/components/TagList";

function HistoryPage() {
  const history = JSON.parse(localStorage.getItem("fabled-lands") || "[]");

  return (
    <Card title="History">
      {history.length === 0 && <p>No history yet.</p>}

      <TagList tags={history} />
    </Card>
  );
}

export default HistoryPage;
