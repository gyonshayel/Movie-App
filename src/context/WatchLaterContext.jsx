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

  const toggleWatchLater = (movieObj) => {
    setWatchLaterList((prev) => {
      const exists = prev.some((object) => object.id === movieObj.id);
      return exists
        ? prev.filter((object) => object.id !== movieObj.id)
        : [movieObj, ...prev];
    });
  };

  const isInWatchLater = (movieId) =>
    watchLaterList.some((object) => object.id === movieId);

  return (
    <WatchLaterContext.Provider
      value={{ watchLaterList, toggleWatchLater, isInWatchLater }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
}

export const useWatchLater = () => useContext(WatchLaterContext);
