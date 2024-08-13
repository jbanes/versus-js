# Coding style

The coding style used in the original project is based on the Allman style of code. This style is intended to foster easy readability and fast skimming. Control is always vertical while details of a statement are always horizontal. 

## Tabs

Four space are used as the tab stop.

## Curly braces

Curly braces are always on new lines with only one exception.

```
function myfunc()
{
    if(condition)
    {
        ...
    }
}

class MyClass
{
   constructor()
   {
   }
}
```

The one exception is anonymous inner functions. These functions are enclosed within a statement. Keeping the curly brace on the same line allows the reader to know the anonymous function is a parameter to another statement.

```
setTimeout(function() {
    // do stuff
}, 10);

[1,2,3].forEach((value, index) => {
    console.log(value);
});
```

## Wrapped statements

Statements should never be wrapped. If a line gets too long, the code should be split into multiple statements rather than wrapping. 

The exception is chained statements. Chained statements should be indented for each level of chaining.

```
$(".class")
    .append($("<div>">)
        .text("Hello"))
    .append($("<div>")
        .text("World!))
    .addClass(".style")
    .show();
```


## Vertical spacing and Statement blocks

Vertical spacing is used generously to ensure code remains readable.

Functions and classes always have a single line separating them from other statements.

```
var global;

function abc()
{
}

function def()
{
}

class Xyz
{
}
```

Multiline control blocks always have a vertical space between them and other statements.

```
var value = 0;

if(value)
{
}

value++:
```

Variable blocks are grouped together in blocks of up to 5 lines. Similar variable names or types are grouped together. A space always follows variable definitions.

```
const abc = 1;
const def = 2;
const hij = 3;

var value1;
var value2;
var value3;

for(var i=0; i<10; i++)
{
}
```



## Single line control blocks