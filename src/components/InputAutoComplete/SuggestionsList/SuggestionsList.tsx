import { FunctionComponent } from "react";
import { ISuggestion } from "../../../types/suggestion";

import "./SuggestionsList.css";

interface SuggestionsListProps {
  suggestions: ISuggestion[];
  onClick: (suggestion: ISuggestion) => () => void;
  currentSuggestion: number | null;
  keyword: string;
}

export const SuggestionsList: FunctionComponent<SuggestionsListProps> = ({
  suggestions,
  onClick,
  currentSuggestion,
  keyword,
}) => {
  return (
    <ul className="auto-complete-suggestions-list">
      {suggestions.map((suggestion, index) => {
        // On a real project, I would extract this into its own component
        const labelParts = suggestion.label.split(keyword);
        return (
          <li
            onClick={onClick(suggestion)}
            key={suggestion.id}
            className={`auto-complete-suggestion ${
              currentSuggestion === index
                ? "auto-complete-suggestion-selected"
                : ""
            }`}
          >
            {labelParts.map((part, index) => (
              <>
                <span>{part}</span>
                {/* This probably isn't the best way to highlight the matching text, but it works within the time constraints */}
                {index !== labelParts.length - 1 && (
                  <span className="highlighted-keyword">{keyword}</span>
                )}
              </>
            ))}
          </li>
        );
      })}
    </ul>
  );
};
