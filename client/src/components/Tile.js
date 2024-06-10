
function Tile(props) {
    return (
        <div className="flip-card bg-transparent h-80 w-80">
            <div className="flip-card-inner relative w-full h-full text-center">
                <div className="flip-card-front absolute w-full h-full bg-spotify-green text-spotify-black font-bold flex justify-center items-center rounded-lg p-5">
                    <h2>{props.title}</h2>
                </div>
                <div className="flip-card-back absolute w-full h-full bg-spotify-green text-spotify-black rounded-lg p-5 flex justify-center items-center">
                    <p dangerouslySetInnerHTML={{__html: props.description}}/>
                </div>
            </div>
        </div>
    );
}

export default Tile;