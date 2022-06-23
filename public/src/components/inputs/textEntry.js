import { TextInput } from "@mantine/core";

const TextEntry = ({
  label,
  labelColor = "#EEE",
  value,
  name,
  onChange,
  type = "text",
  required = true,
  extraClasses = "mb-3",
}) => {
  // Extra input styling for Mantine components
  const inputStyles = {
    label: {
      color: labelColor,
      fontSize: 16 + "px",
      marginRight: 8 + "px",
      marginBottom: 0,
      textAlign: "right",
      fontWeight: 600,
    },
    required: { display: "none" },
    root: {
      display: "grid",
      gridTemplateColumns: "2fr 4fr",
      alignItems: "center",
    },
  };

  return (
    <TextInput
      label={label}
      name={name}
      value={value}
      type={type}
      radius="md"
      size="sm"
      styles={inputStyles}
      onChange={onChange}
      className={extraClasses}
      required={required}
    />
  );
};

export default TextEntry;
