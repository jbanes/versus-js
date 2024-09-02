$.fn.codeblock = function() {
    
    const TYPE_SPACE = 0;
    const TYPE_WORD = 1;
    const TYPE_SEPARATORS = 2;
    const TYPE_STRING = 3;
    const TYPE_COMMENT_SINGLE = 4;
    const TYPE_COMMENT_MULTI = 5;
    
    const keywords = ["for", "if", "while", "else", "function", "break", "continue", "return", "var", "let", "const", "this", "get", "set"];
    const global = ["$", "console", "window"];
    
    function parseLine(line)
    {
        let tokens = [];
        let working = "";
        let mode = TYPE_SPACE;
        
        let type;
        let open;
        let c;
        
        for(let i=0; i<line.length; i++)
        {
            c = line.charAt(i);
            
            if(mode === TYPE_STRING)
            {
                if(c === '\\')
                {
                    working += c + line.charAt(++i);
                    continue;
                }
                
                if(c === open)
                {
                    tokens.push({text: (working + c), type: mode});
                    
                    working = "";
                    mode = TYPE_SPACE;
                    continue;
                }
                
                working += c;
                continue;
            }
            
            if(mode === TYPE_COMMENT_SINGLE)
            {   
                working += c;
                continue;
            }
            
            if(" \t".indexOf(c) >= 0) type = TYPE_SPACE;
            else if("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".indexOf(c) >= 0) type = TYPE_WORD;
            else if("[]{}()=+-\*|!%?;,.:<>&".indexOf(c) >= 0) type = TYPE_SEPARATORS;
            else if("\"'`".indexOf(c) >= 0) type = TYPE_STRING;
            else if("/".indexOf(c) >= 0 && line.charAt(i+1) === '/') type = TYPE_COMMENT_SINGLE;
            else if("/".indexOf(c) >= 0 && line.charAt(i+1) === '*') type = TYPE_COMMENT_MULTI;
            else throw new Error("Unrecognized character [" + c + "]");
            
            if(type === mode)
            {
                working += c;
                continue;
            }
            
            if(working)
            {
                tokens.push({text: working, type: mode});

                working = "";
            }
            
            if(type === TYPE_STRING)
            {
                open = c;
            }
            
            working = c;
            mode = type;
        }
         
        if(working)
        {
            tokens.push({text: working, type: mode});
        }
        
        return tokens;
    }
    
    function parseTokens(code)
    {
        let tokens = [];
        let lines = code.split('\n');
        let line;

        for(let i=0; i<lines.length; i++)
        {
            line = parseLine(lines[i]);
            
            tokens.push(line);
        }

        return tokens;
    }
    
    function leftShiftTrim(tokens)
    {
        let smallest = -1;

        while(tokens.length && ((tokens[0].length === 1 && tokens[0].type === TYPE_SPACE) || !tokens[0].length))
        {
            tokens.shift();
        }
        
        while(tokens.length && tokens[tokens.length-1].length === 1 && tokens[tokens.length-1][0].type === TYPE_SPACE) 
        {
            tokens.pop();
        }

        tokens.forEach(function(line, index) {
            if(!line.length) return;

            if(line[0].type !== TYPE_SPACE) smallest = 0;
            else if(line.length === 1) return;
            else if(smallest < 0 || line[0].text.length < smallest) smallest = line[0].text.length;
        });
        
        if(smallest < 1) return;

        tokens.forEach(function(line, index) {
            if(!line.length) return;
            if(!line[0].type === TYPE_STRING) return;

            line[0].text = line[0].text.substring(smallest);
        });
    }
    
    function colorize(tokens)
    {
        var bold = false;

        tokens.forEach(function(line, index) {
            line.forEach(function(token) {
                if(token.type === TYPE_STRING) 
                {
                    token.style = "string";
                }
                
                if(token.type === TYPE_WORD)
                {
                    if(bold)
                    {
                        token.style = "function";
                        bold = false;
                    }
                    
                    if(keywords.indexOf(token.text) >= 0)
                    {
                        token.style = "keyword";
                        
                        if(token.text === "function" || token.text === "get" || token.text === "set") 
                        {
                            bold = true;
                        }
                    }
                    
                    if(global.indexOf(token.text) >= 0)
                    {
                        token.style = "global";
                    }
                }
                
                if(token.type === TYPE_SEPARATORS)
                {
                    if(bold) bold = false;
                }
                
                if(token.type === TYPE_COMMENT_SINGLE)
                {
                    token.style = "comment";
                }
            });
        });
    }
    
    function optimize(tokens)
    {
        tokens.forEach(function(line, index) {
            for(let i=0; i<line.length-1; i++)
            {
                var left = line[i];
                var right = line[i+1];

                if((!left.style && !right.style))
                {
                    left.text += right.text;
                    line.splice(i+1, 1);
                    i--;
                }
            }
        });
    }
    
    function render(element, tokens, startLine, highlight, minwidth)
    {
        $(element).empty();
        
        tokens.forEach(function(line, index) {
            var div = $("<div>");
            var span;
            
            div.append($("<span>").addClass("linenumbers").text(index+startLine));
            div.append($("<span>").addClass("spacer"));
            
            if(!line.length || (line.length === 1 && !line[0].text))
            {
                div.append($("<span>").text(" "));
                $(element).append(div);
                return;
            }
            
            line.forEach(function(token) {
                span = $("<span>").text(token.text).addClass(token.style || "");
                
                if(highlight.includes(token.text)) span.addClass("highlight");
                
                div.append(span);
            });
            
            if(minwidth) div.css("min-width", minwidth);
            if(minwidth) $(element).css("min-width", minwidth);
            
            $(element).append(div);
        });
    }
    
    $(this).addClass("codeblock");
    
    $(this).each(function(index, element) {
        var text = $(element).text();
        var tokens = parseTokens(text);
        
        var block = $("<div>").addClass("block");
        var startLine = Number($(element).attr("start-line")) || 1;
        var highlight = ($(element).attr("highlight") && $(element).attr("highlight").split(",")) || [];
        var minwidth = $(element).attr("min-width");

        leftShiftTrim(tokens);
        colorize(tokens);
//        optimize(tokens);     // Having iOS rendering issues with this
        
        render(block, tokens, startLine, highlight, minwidth);
        
        $(element)
            .css("display", "flex")
            .empty()
            .append(block);
    });
};

$("code.javascript").codeblock();

setTimeout(function() {
    $(".codeblocks").scrollLeft(-10000);
}, 50);
