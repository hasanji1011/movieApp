$(document).ready(()=>{
    //alert(7)
    $('#searchMovie').on('submit',(e)=>{
        console.log($('#query').val());
        getMovie($('#query').val());
        e.preventDefault();
    })
});
    function getMovie(query){
        axios.get('http://www.omdbapi.com/?s='+query)
        .then((res)=>{
            console.log(res.data.Search);
            showMovies(res.data.Search);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    
    
    function showMovies(data){
        let output='';
        data.forEach((movie)=>{
            output+=`
                <div class="col-md-3">
                    <div class="text-center well movie-item">
                        <figure><img src="${movie.Poster}" /></figure>
                        <h6>${movie.Title}</h6>
                        <a  class="btn btn-primary" onclick="movieSelected('${movie.imdbID}')" href="javascript:void(0)">Movie Details</a>
                    </div>
                </div>
            `;
        })
        $('#movies').html(output);
    }
    
    function movieSelected(id) {
        sessionStorage.setItem("movieId",id);
        window.location= 'movie.html';
    }
    
    function getDetails(){
        axios.get('http://www.omdbapi.com?i='+sessionStorage.getItem("movieId"))
        .then((res)=>{
            let movie = res.data;

      let output =`
            <div class="row">
              <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
              </div>
              <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                  <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                  <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                  <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                  <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                  <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                  <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                  <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="well">
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go Back To Search</a>
              </div>
            </div>
          `;
            $('#movie').html(output);
        })
        .catch((err)=>{
            console.log(err);
        })
    }