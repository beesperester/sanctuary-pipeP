const $ = require('sanctuary-def');
const Sanctuary = require('sanctuary');

// PromiseType :: Type -> Type -> Type
const PromiseType = $.BinaryType
	('beesperester/sanctuary-pipeP')
	('https://github.com/beesperester/sanctuary-pipeP')
	([])
	(x => Object.prototype.toString.call(x) === '[object Promise]')
	(p => [])
	(p => []);

const env = [PromiseType($.Unknown)($.Unknown)];

const S = Sanctuary.create({
	checkTypes: true,
	env: Sanctuary.env.concat(env)
});

const pipeP = transforms => {
	const head = transforms.shift();

	return S.reduce(reducerAsync)(head)(transforms);
};

const reducerAsync = f => g => {
	return input => {
		const context = this;

		return Promise.resolve(f.call(context, input)).then(x => g.call(context, x))
			.then(x => {
				if (x.value) {
					// is mappable
					// resolve possible promise in x.value,
					// then replace x.value with promise result
					// catch any errors and put them in the Left branch
					return Promise.resolve(x.value)
						.then(y => S.map(z => y)(x))
						.catch(S.Left);
				} else {
					return x;
				}
			});
	};
};

module.exports = {
  pipeP: pipeP,
  env: env
};