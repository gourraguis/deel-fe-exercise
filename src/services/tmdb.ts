import { ISuggestion } from "../types/suggestion";

// Adding my own API key here, to make testing on your side easier without bothering with env variables
// It goes without saying that I wouldn't push something like this on a real project
const API_KEY = "20713084dcc97f0c105379f2cebefc54";

export const getMovieSuggestions = async (
  keyword: string
): Promise<ISuggestion[]> => {
  try {
    // On a real project, I would implement typings for the api response and check for common errors
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`
    );
    const data = await response.json();
    
    const suggestions: ISuggestion[] = data?.results.map((result: any) => ({
      id: result.id,
      label: result.original_title,
    }));

    // We're only returning the first page of results as suggestions, they're enough for our testing purposes
    return suggestions || [];
  } catch (error) {
    console.warn("Failed to fetch suggestions from tmdb");
    console.error(error);
    return [];
  }
};
