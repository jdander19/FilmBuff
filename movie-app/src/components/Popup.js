import React from 'react'

function Popup({ selected, closePopup }) {
	return (
		<section className="popup">
			<div className="content">
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>
				<b className="rated">Rated {selected.Rated}</b>
				<p className="genre">Genre: {selected.Genre}</p>
				<p className="rating">IMDB Rating: {selected.imdbRating} / 10 <br></br>IMDB Votes: {selected.imdbVotes}</p>
				
				<div className="plot">
					<img src={selected.Poster} />
					<b>{selected.Plot}</b>
					<p className="director"><span>Director: </span> {selected.Director}</p>
					<p className="writer"><span>Writer: </span> {selected.Writer}</p>
					<p className="actors"><span>Actors: </span> {selected.Actors}</p>
				</div>
				<div className="info">
				<p className="released">First Released on {selected.Released}</p>
				<p className="runtime">Runtime: <span>{selected.Runtime}</span></p>
				<p className="country">Country: <span>{selected.Country}</span></p>
				<p className="language">Language: <span>{selected.Language}</span></p>
				<p className="awards">Awards: <span>{selected.Awards}</span></p>
				<p className="boxoffice">BoxOffice Revenue: <span>{selected.BoxOffice}</span></p>
				<p className="production">Production Company: <span>{selected.Production}</span></p>
				</div>
				<button className="close" onClick={closePopup}>Close</button>
				
					
				
			</div>
		</section>
	)
}

export default Popup