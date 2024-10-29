interface InputProps {
  placeholder: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = (props: InputProps) => {
  return (
    <div>
      <input
        className="text-gray-400 bg-slate-700 p-2 border-none rounded"
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
