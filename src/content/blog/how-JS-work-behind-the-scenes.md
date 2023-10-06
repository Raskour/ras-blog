---
author: Rasmeet Kour
pubDatetime: 2023-10-06T5:15:24Z
title: How JS works behind the scenes
postSlug: how-js-works-behind-the-scenes
featured: true
draft: false
tags:
  - js engine
  - execution-context
  - callstack

description: This article will explain how JavaScript code is executed behind the scenes.
---

To know behind the scenes how JavaScript code gets executed internally, we have to know something called **Execution Context** and its role in the execution of JavaScript code.

**Execution context** represents an environment in which JavaScript code runs.
It has two components,

- **The Memory Component**
- **The Code Component**

The Memory Component is the part where all the variables and function declarations are stored as a `key: value` pair and the Code component parses the code line by line. It is also known as the **Thread of execution**.

![Execution Context](/assets/js-behind-scene/memorycomponent.svg)

Inside the execution context, JS code is executed in two phases.

- **Creation Phase**
- **Execution Phase**

Let us Understand this with the help of the following code:

```js
var num1 = 5;
var num2 = 2;
function sum(n1, n2) {
  return n1 + n2;
}
var newSum = sum(num1, num2);
```

## Creation phase

The following things happen in this phase:

- JavaScript code is scanned for variables and function declarations and the memory is allocated to them in the memory block.
- In the case of a function, JavaScript copies the whole function into the memory block but in the case of variables, it assigns `undefined` as a placeholder.
- In the above code, there are three variables named `num1`, `num2`, `newSum`, and one function named `sum`. So when we run the program the Execution context will look like this.

![Creation Phase](/assets/js-behind-scene/creation-phase.svg)

## Execution Phase

The following happens in this phase:

- The execution of code starts line by line from top to bottom and updates the value of function and variables stored in the memory component.
- In the case of our code as soon as it encounters `num1 = 5` and `num2 = 2`, it assigns respected values to `num1` and `num2` in the memory. Then it moves to the `sum function`. Since memory is already allotted to the sum function, the code moves to the line `var sum1 = sum(num1, num2)`, and `sum()` will be invoked.
- In the execution phase whenever a new function is called, a **new Execution context** is created in the code component.
  ![Execution Phase](/assets/js-behind-scene/execution-phase1.svg)

- Again the same process of storing the variables as `key-value` pairs in the memory component and executing the code in the code component of the new execution context goes on.
- Here in our case, first of all, the variables `n1` and `n2` are stored in the memory part and a value of `undefined` is assigned to them.
- After executing the code line by line, new values assigned will be `n1 = 5, n2 = 2` in the memory component.

![Execution Phase](/assets/js-behind-scene/execution-phase2.svg)

- After the return statement of the invoked function, **the returned value is assigned instead of undefined** in the memory component of the previous execution context.
- After returning the value, the new execution context is **destroyed** and control goes back to the previous execution context and it will look like as shown below.

![Execution Phase](/assets/js-behind-scene/execution-phase3.svg)

![Execution Phase](/assets/js-behind-scene/execution-phase4.svg)

---

## Call Stack

To keep track of all the execution contexts, the JavaScript engine uses **Call stack** also known as **Runtime Stack** or **Machine Stack**.

The call stack is a data structure that stores the current state of your program, including the location of each function call. It uses the [Last In First Out](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>) principle. Each time a function is called, the JavaScript engine pushes a new entry onto the top of the call stack. When the function returns, the JavaScript engine pops the top entry off the call stack.

Here’s an example of how the call stack works in JavaScript:

```js
function firstFunction() {
  secondFunction();
}

function secondFunction() {
  thirdFunction();
}

function thirdFunction() {
  return "something";
}

firstFunction();
```

In this example, when the `firstFunction` is called, it calls `secondFunction`, which in turn calls `thirdFunction`. The JavaScript engine maintains a call stack that looks like this:

![Call stack](/assets/js-behind-scene/callstack1.svg)

When **thirdFunction** returns, the JavaScript engine pops it off the call stack, leaving:

![Call stack](/assets/js-behind-scene/callstack2.svg)

When **secondFunction** returns, the JavaScript engine pops it off the call stack, leaving:

![Call stack](/assets/js-behind-scene/callstack3.svg)

Thus when a function completes its execution, its context is removed from the call stack, and control returns to the previous context. This process continues until all contexts are executed.
