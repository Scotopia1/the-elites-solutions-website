import { forwardRef } from "react";

interface CardProps {
  id: string;
  phase: string;
  date: string;
  title: string;
  span: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ id, phase, date, title, span }, ref) => (
    <div className="card" id={`card-${id}`} ref={ref}>
      <div className="card-title">
        <p>{date}</p>
        <h1>
          {title} <span>{span}</span>
        </h1>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export default Card;
