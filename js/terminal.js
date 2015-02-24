jQuery(document).ready(function($) {
    //var id = 1;
    var frames = [];
    var LINES_PER_FRAME = 14;
    var DELAY = 67;
    //star_wars is array of lines from 'js/star_wars.js'
    var lines = star_wars.length;
    for (var i=0; i<lines; i+=LINES_PER_FRAME) {
        frames.push(star_wars.slice(i, i+LINES_PER_FRAME));
    }
    var stop = false;

    function play(term) {
        var delay;
        var i = 0;
        var next_delay;
        if (delay == undefined) {
            delay = DELAY;
        }
        function display() {
            if (i == frames.length) {
                i = 0;
            }
            term.clear();
            if (frames[i][0].match(/[0-9]+/)) {
                next_delay = frames[i][0] * delay;
            } else {
                next_delay = delay;
            }
            term.echo(frames[i++].slice(1).join('\n')+'\n');
            if (!stop) {
                setTimeout(display, next_delay);
            } else {
                term.clear();
                //greetings(term);
                i = 0;
            }
        }
        display();
    }
    $('.terminal-body').terminal(function(command, term) {
        if (command == 'help') {
            term.echo("Available commands are : 'cv', 'me', 'social', 'movies' ");
        }else if (command == 'cv'){
            /*term.push(function(command, term) {
                if (command == 'help') {
                    term.echo('if you type ping it will display pong');
                    //term.pop();
                } else if (command == 'ping') {
                    term.echo('pong');
                } else {
                    term.echo('unknown command ' + command);
                }
            }, {
                prompt: 'test> ',
                name: 'help'});*/
            window.open('https://www.linkedin.com/profile/view?id=218259288');
        }else if(command == 'me'){
            term.echo('Hi I\'m Damien, born in France and raised by Portuguese parents. I\'ve always been in love with technologies, due to my brother who passed me this passion. I\'m a big fan of video games and a curious person with everything who is related with informatics. ');
        }else if(command == 'social'){
            //term.echo("Type 'help' to see all the commands available.");
            term.push(function(command, term){
                if(command== 'help'){
                    term.echo("Available commands are : 'linkedin', 'twitter', 'github', 'back' ");
                }else if(command == 'linkedin'){
                    window.open('https://www.linkedin.com/profile/view?id=218259288');
                }else if(command == 'twitter'){
                    window.open('https://twitter.com/Damiii45');
                }else if(command == 'github'){
                    window.open('https://github.com/damienvaz');
                }else if(command == 'back'){
                    term.pop();
                }else {
                    term.echo("Unknown command '" + command + "' \t (Type 'help' to see all the commands available.)");
                }
                
            },{prompt: 'social>', name: 'bash'});
        }else if(command == 'movies'){
            
            term.echo('STAR WARS ASCIIMACTION\n'+
                          'Simon Jansen (C) 1997 - 2008\n'+
                          'www.asciimation.co.nz\n\n'+
                          'type "play" to start animation, '+
                          'press SHIFT+D to stop');
            term.push(function(command, term){
                //term.pop();
                if (command == 'play') {
                    term.pause();
                    stop = false;
                    console.log(term);
                    play(term);
                }else if(command== 'help'){
                    term.echo("Available commands are : 'play', 'back' ");
                }else if(command == 'back'){
                    term.pop();
                }else {
                    term.echo("Unknown command '" + command + "' \t (Type 'help' to see all the commands available.)");
                }
                
            },{ prompt: 'movies>', 
                name: 'bash2',
                //width: 500,
                //height: 230,
                //prompt: 'starwars> ',
                enabled:true,
                greetings: null
              });
        }else {
            term.echo("Unknown command '" + command + "' \t (Type 'help' to see all the commands available.)");
        }
    }, {
        greetings: "Type 'help' to see all the commands available.",
        onBlur: function() {
            // prevent loosing focus
            return false;
        },
        clear: true,
        keypress: function(key, term) {
            console.log("k1");
            console.log(key);
            if (key.which == 68 && key.shiftKey) {
                console.log("entrei aqui no keypress");
                stop = true;
                term.resume();
                return false;
            }
        },
        prompt: "Damien-Vaz-Macbook: $ "
    });
});