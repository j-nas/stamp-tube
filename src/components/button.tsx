const Button: React.FC<Props> = ({ children, onClickFunction, bgColor }) => {
  return (
    <button
      className={`my-2 rounded-md border-2 p-1 ${bgColor}`}
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
};

interface Props {
  children: React.ReactNode;
  onClickFunction?: () => void;
  bgColor?: string;
}
export default Button;
