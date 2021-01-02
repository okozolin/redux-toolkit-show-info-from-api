export const getFavorites = () => {
  const localStorageFavorites = localStorage.getItem("favorites");
  return JSON.parse(localStorageFavorites);
};

export const setFavorites = (state) => {
  localStorage.setItem("favorites", JSON.stringify(state));
};
