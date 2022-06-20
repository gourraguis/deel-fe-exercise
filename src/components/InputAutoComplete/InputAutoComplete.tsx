import { FunctionComponent, useState, KeyboardEvent } from "react";
import { SuggestionsList } from "./SuggestionsList/SuggestionsList";
import { ISuggestion } from "../../types/suggestion";

import "./InputAutoComplete.css";

interface InputAutoCompleteProps {
  id?: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (newValue: string) => void;
  suggestions: ISuggestion[];
  fetchSuggestions?: (keyword: string) => Promise<void>;
}

export const InputAutoComplete: FunctionComponent<InputAutoCompleteProps> = ({
  id = "input-auto-complete",
  label,
  value,
  placeholder,
  onChange,
  suggestions,
  fetchSuggestions,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentSuggestion, setCurrentSuggestion] = useState<number | null>(
    null
  );

  const reloadSuggestions = async (keyword: string) => {
    setCurrentSuggestion(null);
    if (fetchSuggestions) {
      setShowSuggestions(false);
      // on a real project, the following two function calls would be debounced for a better UX
      await fetchSuggestions(keyword);
      setShowSuggestions(true);
    }
  };

  const handleClick = (suggestion: ISuggestion) => () => {
    onChange(suggestion.label);
    reloadSuggestions("");
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;

    onChange(currentValue);
    reloadSuggestions(currentValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const keys = ["ArrowUp", "ArrowDown", "Escape", "Enter"];
    const { key } = event;

    if (keys.includes(key)) {
      event.preventDefault();
      event.stopPropagation();
    }

    switch (key) {
      case "ArrowUp":
        setCurrentSuggestion((prev) => {
          if (!suggestions.length) {
            return null;
          }
          return prev != null
            ? (prev - 1 + suggestions.length) % suggestions.length
            : suggestions.length - 1;
        });
        break;
      case "ArrowDown":
        setCurrentSuggestion((prev) => {
          if (!suggestions.length) {
            return null;
          }
          return prev != null ? (prev + 1) % suggestions.length : 0;
        });
        break;
      case "Escape":
        onChange("");
        reloadSuggestions("");
        break;
      case "Enter":
        if (currentSuggestion != null) {
          onChange(suggestions[currentSuggestion].label);
          reloadSuggestions("");
        }
        break;
    }
  };

  return (
    <div className="auto-complete-input-container">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
      />
      {showSuggestions && (
        <SuggestionsList
          suggestions={suggestions}
          onClick={handleClick}
          currentSuggestion={currentSuggestion}
          keyword={value}
        />
      )}
    </div>
  );
};
