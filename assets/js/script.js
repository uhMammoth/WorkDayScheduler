var savedTasks = [];
var blockhours = [moment().hour(9), moment().hour(10), moment().hour(11), moment().hour(12), moment().hour(13), moment().hour(14), moment().hour(15), moment().hour(16), moment().hour(17)];

var lateOrNot = function(i){
    var now = moment();
    if(now.isAfter(blockhours[i]) && (now.hour() === blockhours[i].hour())){
        return 'present';
    }
    else if(now.isAfter(blockhours[i])){
        return 'past';
    }
    else if(now.isBefore(blockhours[i])){
        return 'future';
    }
    
}

var loadTasks = function(){
    savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(!savedTasks){
        savedTasks = ['', '', '', '', '', '', '', '', ''];
    }
}

//
var saveTasks = function(){
    var btnId = $(this)
        .attr('id')
        .replace('save-', '');
    var textToSave = $(this).prev().text();
    savedTasks[btnId] = textToSave;
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

var createTimeblocks = function (){
    var today = $('#currentDay');
    today.text(moment().format("dddd, MMMM Do"));
    loadTasks();
    for (let i = 0; i < blockhours.length; i++){
        $('<li class="row">').appendTo('#timeblock');
    }
    
    $('li').each(function(i){        
        $(this)
            .append("<p class='col-1 hour'>"+ blockhours[i].format("hA") +"</p><p class='col description'>"+ savedTasks[i] +"</p><button class='col-1 saveBtn'><img src='./assets/images/floppy-disk-solid.svg'></button>"); 
        i++;       
    });    
    $('li .description').each(function(i){
        $(this)
            .addClass(lateOrNot(i));
        i++;
    });
    $('.saveBtn').each(function(i){
        $(this)    
            .attr("id", "save-"+ i);
        i++;
    });
}

createTimeblocks();

//makes textbox editable changes p to textarea
$('.row').on("click", "p", function(){
    var text = $(this)
        .text()
        .trim();
    var classList = $(this)
        .attr("class");
    var textInput = $("<textarea class='col'>")
        .addClass(classList)
        .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});
//when out of focus changes textarea back to p
$('.row').on("blur", "textarea", function(){
    var text = $(this)
        .val()
        .trim();
    var classList = $(this)
        .attr("class");
    var pElement = $("<p class='col description'>")
        .text(text)
        .addClass(classList);
    $(this).replaceWith(pElement);
});

//listens for save button click
$('.saveBtn').on("click", saveTasks);