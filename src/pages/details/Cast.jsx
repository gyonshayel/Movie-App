import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CastCard } from "./CastCard";
import { Error } from "../../components/Error";

export function Cast({ apiKey }) {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  const fetchCastData = async () => {
    try {
      const apiCall = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
      const response = await fetch(apiCall);

      if (!response.ok) throw new Error("Failed to fetch data from the server");

      const data = await response.json();
      setCast(data.cast);
    } catch (error) {
      if (error.name !== "AbortError") setError(error.message);
    }
  };

  useEffect(() => {
    fetchCastData();
  }, [id, apiKey]);

  return (
    <>
      <div className="flex overflow-x-scroll">
        {cast.map((castMember) => {
          const profile = castMember.profile_path
            ? `https://image.tmdb.org/t/p/original${castMember.profile_path}`
            : null;
          return (
            <CastCard
              key={castMember.id}
              profile={profile}
              name={castMember.name}
              character={castMember.character}
            />
          );
        })}
      </div>
      {error && <Error />}
    </>
  );
}
