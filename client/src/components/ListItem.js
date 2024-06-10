
function ListItem({ playlist, onClick }) {

  return (
    <div className="flex gap-2 items-center text-spotify-green w-fit cursor-pointer" onClick={onClick}>
      <img className="w-10 h-10" src={playlist.images[0].url} alt={playlist.name} />
        <h3>{playlist.name}</h3>
    </div>
  );
}

export default ListItem;