import { Select } from "@mantine/core";

const SelectEntry = ({
  label,
  labelColor = "#EEE",
  value,
  name,
  onChange,
  required = true,
  options = [],
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
    <Select
      label={label}
      name={name}
      value={value}
      radius="md"
      size="sm"
      data={options}
      styles={inputStyles}
      onChange={onChange}
      className="mb-3"
      required={required}
    />
  );
};

export default SelectEntry;
