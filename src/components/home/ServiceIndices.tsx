import { forwardRef } from "react";
import { indicesData } from "./servicesData";

interface IndicesProps {
  setIndicesRef: (el: HTMLDivElement | null, index: number) => void;
}

const Indices = forwardRef<HTMLDivElement, IndicesProps>(
  ({ setIndicesRef }, ref) => (
    <div className="indices" ref={ref}>
      {indicesData.map((index, i) => (
        <div
          key={index.id}
          className="index"
          id={index.id}
          ref={(el) => setIndicesRef(el, i)}
        >
          <p>{index.date}</p>
          <p>{index.description}</p>
        </div>
      ))}
    </div>
  )
);

Indices.displayName = "Indices";

export default Indices;
