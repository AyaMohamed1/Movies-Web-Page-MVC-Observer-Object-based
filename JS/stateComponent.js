import { eventsMediator } from './eventsMediator.js';
export const stateComponent = {
    init: function (){      
        this.cacheElements();
        this.bindEvents(); 
        this.render();   
    },

    cacheElements: function(){
        this.stats = $("#stats");
    },

    bindEvents: function(){
        eventsMediator.on("movies.change", this.setStateData.bind(this));
    },

    setStateData: function(data){
        console.log(data);
        this.data = data;
        this.topRatedIdx = 0;
        this.topRated = data.results[0].vote_average;
        this.topTitle = data.results[0].original_title;
        this.page = data.page;
        this.NumMovies = data.results.length;
        for(let i = 0; i < data.results.length; i++){
            if(data.results[i].vote_average > this.topRated){
                this.topRatedIdx = i;
                this.topRated = data.results[i].vote_average;
                this.topTitle = data.results[this.topRatedIdx].original_title;

            }   
        }
        this.render();
    },

    render: function(){
        stats.innerHTML = "";
        let statsCard = document.createElement('div');
        let statsCardStr = `
        <h6>Current page: ${this.page}</h6>
        <h6>Number of Movies: ${this.NumMovies}</h6>
        <h6>Top rated Movie: ${this.topTitle}</h6>
        <h6>Rating: ${this.topRated}</h6>`;
        statsCard.innerHTML = statsCardStr;
        stats.appendChild(statsCard);
    }

}