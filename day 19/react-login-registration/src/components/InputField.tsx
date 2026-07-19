import { useState } from "react";

type Props = {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  autoComplete?: string;
};

export function InputField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
  isPassword,
  autoComplete,
}: Props) {
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className="input-wrap">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`input ${error ? "error" : ""}`}
          style={isPassword ? { paddingRight: 64 } : undefined}
        />
        {isPassword && (
          <button
            type="button"
            className="toggle-eye"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}