export function Genres({ genres }) {
  return (
    <>
      {genres.map((genre) => (
        <div
          key={genre.id}
          className="text-center border border-border rounded-2xl px-3 py-1"
        >
          {genre.name}
        </div>
      ))}
    </>
  );
}
