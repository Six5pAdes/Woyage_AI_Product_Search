import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = 'Search products...' }: Props) {
  const [internal, setInternal] = React.useState(value);

  React.useEffect(() => { setInternal(value); }, [value]);

  React.useEffect(() => {
    const id = setTimeout(() => onChange(internal), 300);
    return () => clearTimeout(id);
  }, [internal, onChange]);

  return (
    <input
      className="input"
      type="search"
      value={internal}
      onChange={(e) => setInternal(e.target.value)}
      placeholder={placeholder}
      aria-label="Search products"
    />
  );
}
