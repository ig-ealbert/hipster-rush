import { cardBackImage } from "@/lib/constants";

export default function Card(props: { value: number }) {
  return (
    <>
      {props.value > 0 && <div className="card">{props.value}</div>}
      {props.value <= 0 && (
        <div
          className="faceDownCard"
          style={{ backgroundImage: cardBackImage }}
        ></div>
      )}
    </>
  );
}
