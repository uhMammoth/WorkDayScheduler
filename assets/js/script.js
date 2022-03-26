var savedTasks = [];

var populateTimeblocks = function (){
    var blockhours = [moment().hour(9), moment().hour(10), moment().hour(11), moment().hour(12), moment().hour(13), moment().hour(14), moment().hour(15), moment().hour(16), moment().hour(17)];
    for (let i = 0; i < 10; i++){
        $('<li class="row">').appendTo('#timeblock');
    }
    
    $('li').each(function(i){
        $(this)
            .append("<p class='col-1 hour'>"+ blockhours[i].format("hA") +"</p><p class='col description'>"+ loadTasks(i) +"</p><button class='col-1 saveBtn'></button>"); 
        
        i++;         
    });
    $('.description').each(function(){
        console.log('huh');
    });
    
}

var loadTasks = function(i){

    if(null){

    }
    else {
        return 'Enter a task.';
    }
}

var pastPresentFuture = function (checkBlock){
    
}

populateTimeblocks();