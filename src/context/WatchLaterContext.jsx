import { createContext, useContext, useState, useEffect } from "react";

const WatchLaterContext = createContext();

export function WatchLaterProvider({ children }) {
  const [watchLaterList, setWatchLaterList] = useState([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("watchLaterArray")) || [];
    setWatchLaterList(arr);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchLaterArray", JSON.stringify(watchLaterList));
  }, [watchLaterList]);

  const toggleWatchLater = (movie) => {
    setWatchLaterList((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      return exists
        ? prev.filter((item) => item.id !== movie.id)
        : [movie, ...prev];
    });
  };

  const isInWatchLater = (id) => watchLaterList.some((item) => item.id === id);

  return (
    <WatchLaterContext.Provider
      value={{ watchLaterList, toggleWatchLater, isInWatchLater }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
}

export const useWatchLater = () => useContext(WatchLaterContext);
