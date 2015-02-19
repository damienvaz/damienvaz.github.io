jQuery(document).ready(function($) {
                var id = 1;
                $('.terminal-body').terminal(function(command, term) {
                    if (command == 'help') {
                        term.echo("Available commands are : 'cv', 'me', 'social' ");
                    }else if (command == 'test'){
                        term.push(function(command, term) {
                            if (command == 'help') {
                                term.echo('if you type ping it will display pong');
                            } else if (command == 'ping') {
                                term.echo('pong');
                            } else {
                                term.echo('unknown command ' + command);
                            }
                        }, {
                            prompt: 'test> ',
                            name: 'help'});
                    }else {
                        term.echo("unknow command " + command);
                    }
                }, {
                    greetings: "Type 'help' for more information about me.",
                    onBlur: function() {
                        // prevent loosing focus
                        return false;
                    },
                    prompt: "Damien-Vaz-Macbook: $ "
                });
            });