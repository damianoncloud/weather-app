interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button onClick={props.onClick}>Search</button>
    </div>
  );
};

export default Button;
