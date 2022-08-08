export const eventsMediator = {
    events: {},
    on: function(eventName, callBackFun){
        this.events[eventName] = this.events[eventName] ? this.events[eventName]: [];
        this.events[eventName].push(callBackFun);
    },

    emit: function(eventName, data){
        if(this.events[eventName]){
            this.events[eventName].forEach(function (callBackFun){
                callBackFun(data);
            })
        }
    }

};