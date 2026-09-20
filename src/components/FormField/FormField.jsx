import "./FormField.css";

export default function FormFiled({
  label = "text",
  id = "text",
  type = "text",
  placeholder = "text",
  icon,
  endIcon,
  value,
  onChange,
  onBlur,
  error,
  min,
  max,
  step,
  disabled = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      <div className="input-container">
        {icon && (
          <span className="input-icon">
            {icon}
          </span>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-erro` : undefined}
        />

        {endIcon && (
          <div className="input-end-icon">
            {endIcon}
          </div>
        )}
      </div>

      {error && (
        <span id={`${id}-erro`} className="input-error">
          {error}
        </span>
      )}
    </div>
  );
}