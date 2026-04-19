import Card from "@/components/Card";
import { ParagraphImage } from "@/components/ParagraphImage";
import { Link } from "react-router-dom";

function GamePage() {
  return (
    <>
      <Card title="Adventuring in the Fabled Lands">
        <div style={{ display: "flow-root" }}>
          <ParagraphImage tag="e000" title="Adventuring in the Fabled Lands" />

          <p>
            Fabled Lands is unlike any other gamebook series. You can play the
            books in any order and return to earlier books whenever you wish.
            You only need one book to start, but collecting more books expands
            the world significantly. Instead of a single storyline, there are
            virtually unlimited adventures in the Fabled Lands. All you need is
            two dice, an eraser, and a pencil.
          </p>

          <p>
            If you have already played other books in the series, you may
            already know your <Link to="/event/e001">entry point</Link>. Turn to
            that section.
          </p>

          <p>
            If this is your first Fabled Lands book, read the{" "}
            <Link to="/rule">rules</Link> before starting at section 1 of The
            War-Torn Kingdom. You will keep the same adventuring persona
            throughout the series. You start as a 1st Rank{" "}
            <Link to="/rule/r012">wanderer</Link> in The War-Torn Kingdom. Over
            time, you gain power, wealth, and experience across the series.
          </p>
        </div>
      </Card>
    </>
  );
}

export default GamePage;
