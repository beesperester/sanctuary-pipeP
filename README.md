# sanctuary-pipeP
Adds async / await functionality to sanctuary pipe.

[![Actions Status](https://github.com/beesperester/sanctuary-pipeP/workflows/Node%20CI/badge.svg)](https://github.com/beesperester/sanctuary-pipeP/actions)
[![Run on Repl.it](https://repl.it/badge/github/beesperester/sanctuary-pipeP)](https://repl.it/github/beesperester/sanctuary-pipeP)

## Example
```javascript

// Import sanctuary.
const Sanctuary = require('sanctuary');

// /Import pipeP and env from sanctuary-pipeP
const { pipeP, env } = require('sanctuary-pipeP');


// Setup Sanctuary environment to include sanctuary-pipeP Promise type.
const S = Sanctuary.create({
  checkTypes: true,
  env: Sanctuary.env.concat(env)
});


// create asynchronous pipe
const pipe = pipeP([
  (x => Promise.resolve(x + 1)),
  S.add(1)
]);


// enjoy
pipe(1).then(console.log); // should output 3
```
