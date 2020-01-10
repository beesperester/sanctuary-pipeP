// Test related imports.
require('chai/register-expect');


// Package related imports.
const Sanctuary = require('sanctuary');
const { pipeP, env } = require('../index');


// Setup Sanctuary environment.
const S = Sanctuary.create({
	checkTypes: true,
	env: Sanctuary.env.concat(env)
});


// Setup tests.
describe('Test sanctuary-pipeP module', function() {
  it('tests synchronous execution', async function() {
    const pipe = pipeP([
      S.add(1),
      S.add(2)
    ]);

    const result = await pipe(1);

    expect(result).to.be.equal(4);
  });

  it('tests synchronous execution with Either', async function() {
    const pipe = pipeP([
      (x => S.Right(x  + 1)),
      S.map(S.add(2))
    ]);

    const result = await pipe(1);

    expect(S.isRight(result)).to.be.true;
    expect(result.value).to.be.equal(4);
  });

  it('tests asynchronous execution', async function() {
    const pipe = pipeP([
      (x => Promise.resolve(x + 1)),
      (x => Promise.resolve(x + 2))
    ]);

    const result = await pipe(1);

    expect(result).to.be.equal(4);
  });

  it('tests asynchronous execution with either', async function() {
    const pipe = pipeP([
      (x => Promise.resolve(S.Right(x + 1))),
      S.map((x => Promise.resolve(x + 2)))
    ]);

    const result = await pipe(1);

    expect(S.isRight(result)).to.be.true;
    expect(result.value).to.be.equal(4);
  });

  it('tests mixed execution', async function() {
    const pipe = pipeP([
      (x => Promise.resolve(x + 1)),
      (x => x + 2)
    ]);

    const result = await pipe(1);

    expect(result).to.be.equal(4);
  });

  it('tests mixed execution with either', async function() {
    const pipe = pipeP([
      (x => Promise.resolve(S.Right(x + 1))),
      S.map((x => x + 2))
    ]);

    const result = await pipe(1);

    expect(S.isRight(result)).to.be.true;
    expect(result.value).to.be.equal(4);
  });
});