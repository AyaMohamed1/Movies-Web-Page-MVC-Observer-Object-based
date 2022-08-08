import { eventsMediator } from './eventsMediator.js';
export const moviesComponent = {
    currentPage: 1,
    URL: `https://api.themoviedb.org/3/movie/popular?api_key=55c3a32875b9f4840436514898693c3d&language=en-US&page=`,
    data: {},
    init: function (){    
        this.fetchData(this.URL + this.currentPage);
        this.cacheElements();
        this.bindEvents();  
    },

    fetchData: async function(URL) {
        const response = await fetch(URL);  
        var moviesData = await response.json();  
        this.data = moviesData; 
        this.render(); 
    },

    cacheElements: function(){
        this.movies = $("#movies");
        this.nextBtn = $("#next");
        this.previousBtn = $("#previous");
    },

    bindEvents: function(){
        this.nextBtn.on("click", this.nextPage.bind(this));
        this.previousBtn.on("click", this.previousPage.bind(this));
    },

    nextPage: function(){
        if(this.currentPage < this.data.total_pages){
            this.currentPage++;
        }
        this.fetchData(this.URL + this.currentPage);
    },

    previousPage: function(){
        if(this.currentPage > 1){
            this.currentPage--;
        }
        this.fetchData(this.URL + this.currentPage);
    },

    
    render: function(){
        let moviesCards = ``;
        let dataForModal = this.data;
        console.log(this.data);
        eventsMediator.emit('movies.change', this.data);
        movies.innerHTML = "";

        for(let i = 0; i < this.data.results.length; i++){
            let moviePoster = `https://image.tmdb.org/t/p/original${this.data.results[i].poster_path}`
            moviesCards += `
            <div class="col-lg-3 col-md-6 col-xs-12">
                <div
                id="card-${i}"
                class="card h-100 my-3"
                data-bs-toggle="modal"
                data-bs-target="#modal-card"
                >
                    <img
                        id="img-card-${i}"
                        src="${moviePoster}"
                        class="card-img-top"
                        alt=""
                    />
                    <div class="card-body" style="text-align: center">
                        <h5 id="title-card-${i}" class="green">${this.data.results[i].original_title}</h5>
                        <p id="rate-card-${i}" class="card-text fw-bold text-secondary">${this.data.results[i].vote_average}</p>
                    </div>
                
                </div>
            </div>`;
        }
        movies.innerHTML = moviesCards;


        // check this should be in bind
        $('.card').on('click', function() {
            this.cardClickedId = $(this).attr("id");
            this.cardClickedId = this.cardClickedId.replace("card-", "");
            this.dataForModalObj = {dataForModal, cardClickedId: this.cardClickedId};
            eventsMediator.emit("card.clicked", this.dataForModalObj);
        });
    }


}