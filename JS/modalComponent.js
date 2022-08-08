import { eventsMediator } from './eventsMediator.js';
export const modalComponent = {
    data: {},
    init: function (){      
        this.cacheElements();
        this.bindEvents();  
    },

    cacheElements: function(){
        this.modal = $("#modal-card");
    },

    bindEvents: function(){
        eventsMediator.on("card.clicked", this.setModalData.bind(this))
    },

    setModalData: function(dataForModalObj){
        this.data = dataForModalObj.dataForModal;
        this.cardClickedId = dataForModalObj.cardClickedId;
        this.render();
    },

    render: function(){
        $("#modal-img").attr("src", `https://image.tmdb.org/t/p/original${this.data.results[this.cardClickedId].poster_path}`);
        $("#modal-title").text(this.data.results[this.cardClickedId].original_title);
        $("#modal-rate").text(`IMDB Rating: ${this.data.results[this.cardClickedId].vote_average}/10 (${this.data.results[this.cardClickedId].vote_count}votes)`);
        $("#modal-body").text(this.data.results[this.cardClickedId].overview);
    }

};