import { CiSearch } from "react-icons/ci";

interface InputProps {
  width: string | number;
  onChange?: any;
  value?: any;
  search?: boolean;
  styles?: React.CSSProperties;
  className?: string;
  children?: any;
}

export const Input = ({
  width,
  onChange,
  value,
  search,
  styles,
  className,
}: InputProps) => {
  const inputStyles = {
    width: "100%",
    padding: "8px",
    border: "0.1px solid rgb(57, 57, 57)",
    borderRadius: "4px",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        width,
      }}
    >
      <input
        value={value}
        onChange={onChange}
        style={{
          ...inputStyles,
          ...styles,
        }}
        className={className}
      />
      {search && <CiSearch style={{ position: "absolute", right: "20px" }} />}
    </div>
  );
};

export const Button = ({
  width,
  onChange,
  styles,
  className,
  children,
}: InputProps) => {
  const buttonStyle = {
    width,
    fontSize: "14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    fontFamily: "Poppins",
    backgroundColor: "rgb(255, 229, 156)",
  };
  return (
    <button
      style={{
        ...buttonStyle,
        ...styles,
      }}
      onClick={onChange}
    >
      {children}
    </button>
  );
};

export const Tag = ({ children, width, styles, onChange }: InputProps) => {
  const tagStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "4px",
    width,
    borderRadius: "12px",
    fontSize: "14px",
    backgroundColor: "white",
    padding: "8px",
    textAlign: "center",
    textTransform: "capitalize",
  };
  return (
    <div
      style={{
        ...tagStyles,
        ...styles,
      }}
      onClick={onChange}
    >
      {children}
    </div>
  );
};
