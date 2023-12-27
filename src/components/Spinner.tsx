import "./Spinner.scss";
export default function Spinner({ color }: { color?: string }) {
  return (
    <div
      className="spinner cover"
      style={color ? { borderColor: `${color} white ${color} ${color}` } : {}}
    ></div>
  );
}
