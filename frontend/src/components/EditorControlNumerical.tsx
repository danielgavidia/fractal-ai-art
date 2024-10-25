interface EditorControlNumericalProps {
  title: string;
  value: number;
  handler: (increase: boolean) => void;
}

const EditorControlNumerical = ({ title, value, handler }: EditorControlNumericalProps) => {
  return (
    <div className="flex justify-between">
      <p>{title}</p>
      <button onClick={() => handler(false)}>-</button>
      <button onClick={() => handler(true)}>+</button>
      <p>{value}</p>
    </div>
  );
};

export default EditorControlNumerical;
