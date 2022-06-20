import { FunctionComponent, useState } from "react";
import { getMovieSuggestions } from "../../services/tmdb";
import { InputAutoComplete } from "../InputAutoComplete/InputAutoComplete";
import { ISuggestion } from "../../types/suggestion";

import "./MoviesSearchDemo.css";

export const MoviesSearchDemo: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const fetchSuggestions = async (keyword: string) => {
    if (!keyword) {
      setSuggestions([]);
      return;
    }

    const newSuggestions = await getMovieSuggestions(keyword);
    setSuggestions(newSuggestions);
  };

  return (
    <main className="main-section">
      <h1>DEEL FE Exercise</h1>
      {/* <form action=""> */}
      <InputAutoComplete
        label="Browse your favorite movies"
        value={inputValue}
        placeholder="John Wick: Chapter 4"
        onChange={setInputValue}
        suggestions={suggestions}
        fetchSuggestions={fetchSuggestions}
      />
      {/* </form> */}
    </main>
  );
};
