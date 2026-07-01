import { useEffect, useRef } from "react";
import { CloseIcon, Icon, SearchIcon } from "../ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onDebouncedChange: (text: string) => void;
  debounceMs?: number;
}

export default function SearchBar({
  value,
  onChangeText,
  onDebouncedChange,
  debounceMs = 400,
}: SearchBarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onDebouncedChange(value);
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, debounceMs]);

  return (
    <Input className="mb-4">
      <InputSlot className="pl-3">
        <InputIcon as={SearchIcon} />
      </InputSlot>
      <InputField
        placeholder="Search products..."
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        returnKeyType="search"
      />
      {value.length > 0 && (
        <InputSlot className="pr-3" onPress={() => onChangeText("")}>
          <InputIcon as={CloseIcon} />
        </InputSlot>
      )}
    </Input>
  );
}
