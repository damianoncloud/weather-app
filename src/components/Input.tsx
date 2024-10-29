import React from "react";

interface InputProps {
  placeholder: string;
}

const Input = (props: InputProps) => {
  return (
    <div>
      <input
        className="text-gray-400 bg-slate-700 p-2 border-none rounded"
        type="text"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
