import Card from "../card/Card";
import "./cards.css";

export default function Cards({ cards, bn, onActivity }) {
  return (
    <>
      <div className="cards">
        {cards.map((c) => (
          <Card onActivity={onActivity} card={c} bn={bn} />
        ))}
      </div>
    </>
  );
}
