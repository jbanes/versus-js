# Versus JS

There is a general conversation around jQuery that it is a "legacy" tool that has long since been replaced with ES6. This conversation seems to focus on features like ```document.querySelector()``` as "replacements" for what jQuery does. Many state that jQuery can be replaced by "four lines of utility code". 

Unfortunately, these conversations appear to be poorly thought out. Most arguments ignore the two key features that make jQuery valuable:

- The ability to apply operations across many elements found by the selector
- The ability to chain these operations, leading to dense code

This project attempts to pit jQuery against ES6 to analyze if there is any merits to the arguments for or against jQuery.

## Approach

Two implementations of a simplified paged content screen have been created. One using jQuery and the other using ES6.

The same coding style has been used for both and every attempt has been made to be idiomatic of the technology and latest standards.

## Findings

| Technology | Total LOC | Javascript LOC | File Size | Total Download Size |
| ---------- | --------- | -------------- | --------- | ------------------- |
| jQuery     | 67        | 45             | 2,289 bytes | 72,553 bytes      |
| ES6        | 115       | 94             | 3,567 bytes | 3,567 bytes       |

Using jQuery resulting in 53% less Javascript and 36% smaller file size over ES6. The jQuery code achieves this through a much higher code density.

ES6 is a clear winner in total download size, where the loss in index.html is made up for by the need to download the jQuery library.

## Analysis

While it might be tempting to give ES6 the win due to the smaller download, it is important to understand that this is a micro-benchmark. In real world deployments, the amount of Javascript used on an interactive site will quickly overwhelm the 70KB required by jQuery. This is especially meaningful for multipage applications where the jQuery library will be cached once and then continuously reused across numerous page downloads. SPAs tend to prefer larger downloads up-front, making the size something of a non-issue for performance.

More importantly, we know that more code means longer development times. As documented by Fred Brooks in his 1975 work *The Mythical Man Month*, the number of lines of code produced over a period of time tends to remain consistent. And given that the findings that productivity averaged out to 10-20 lines of code per day, a strong case can be made for significantly higher productivity using jQuery.

## Conclusions

While this is a simple case, it argues for the continuing efficacy of jQuery as a tool in the web developer's toolbox. Like many advancements, ES6 provides even more tools at our disposal. This example is intended to help developers make more informed decisions rather than relying on the popularity contest that is today's technology landscape.

With that said, it is of importance that this is merely one example. An ideal comparison would be at scale in real-world applications. While my own experience lends credence to the idea that jQuery scales over ES6, this does not outright prove that. Thus I invite others to share their data and examples to see if we can find cases that demonstrate the opposite conclusions. 
