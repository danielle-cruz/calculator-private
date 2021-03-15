# Calculator

Developed for Tutorfly coding challenge, 2021.

## Overview

This is a React JS program designed to simulate a scientific calculator.

### Features

#### Basic features

* Supports the 4 basic operators of addition, subtraction, multiplication, and division
* Suppports decimal arithmetic
* Is composed of at least 3 distinct React components (Calculator, Screen, and Keypad)

#### Advanced features

* Supports additional functions like exponents
* Supports “EMDAS” ordering of PEMDAS
* Supports summation notation (takes in a lower limit, upper limit, and inner function to compute a sum)
* Keeps a history of past calculations which allows the user to easily replicate and edit past expressions and their corresponding results
* Error prevention for consecutive operands, consecutive decimals, incomplete expressions (e.g. an expression that ends in an operand)
* Supports backspace, clearing, clearing history

## Reflections

### Approach

I approached the problem by first thinking about what kind of calculator I wanted to implement. I thought back to basic calculators like the ones on smartphones or online, as well as to more advanced calculators like scientific or graphing ones that I'd used in high school. Comparing between the two, I then reflected on what sorts of features I personally find most useful in a smooth calculator experience, and I settled on replicating the functionality of one of my scientific calculators. This included scrolling through past calculations and their results so that I could edit and re-compute them without having to type the entire expression back out again. It also included preventing and recovering from errors, as I often get frustrated when I type one wrong digit and have to “clear” and start over again. 

After settling on these ideas, I drew out what sorts of pieces there would be to my calculator (e.g. Screen, Keypad) and mapped out what sorts of data I’d need to keep track of in order to make this possible (e.g. history of calculations, current expression being calculated). I also listed a few foreseeable errors that I’d have to account for (e.g. consecutive opreands, consecutive decimals, pressing “enter” on an expression ending in an operand) and tried to see where they might fit.

### Thought process

My general thought process for the code was to first get a very basic calculator up and running, just with the four basic operations and without regard to order of operations. Then, based on the framework I’d come up with to implement this basic version, I thought about what sorts of additional features might lend themselves nicely to add onto the existing code. For example, adding exponent functionality didn’t seem much different from the other operations, so I decided to include it as well. Then, I tried incorporating some of the more involved features like backspacing and replicating history which were central to the ease of use for a scientific calculator. Last, I reworked my expression evaluation functions to follow the EMDAS order of operations and added the summation functionality as one of the possible operations.

### Challenges

For me, the main challenges involved discerning where to place certain blocks of code — that is, figuring out where to store which states and which functions (i.e. in Calculator or in Screen?). Navigating between what I should include in the parent component vs. the child component was a central challenge, as I wanted to keep the Components as modular and as balanced as possible. I tackled this challenge by trying to keep functions and states as close as possible to the elements they most exclusively corresponded to. For instance, some functions solely affected how the display looks, so I placed those in Screen.js. However, for other functions, they affected which buttons could be pressed in the Keypad as well as how the current expression would appear on the Screen, so I placed those in Calculator.js.

## Next steps

While this program replicates the functionality of most basic calculators in handling the four basic arithmetic operations and adds a few advanced features in supporting summation and maintaing history, we can imagine other operations that students often find useful in more advanced calculator. For instance, calculating square roots, factorials, or even derivatives would prove helpful in most high school classrooms.  Additionally, supporting more common opreations like finding the area of a square given a radius or the area of a triangle given a base and a height would also be helpful next steps. Other potential improvements  could include adding parentheses to the order of operations or adding a button for negative number arithmetic (e.g. a (-) button).