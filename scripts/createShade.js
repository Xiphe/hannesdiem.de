const convert = require('color-convert');
const chalk = require('chalk');

const from = '#010d30';
const to = '#1e236f';
const steps = 2;
const add = 0;

const [hueFrom, satFrom, lightFrom] = convert.hex.hsl(from);
const [hueTo, satTo, lightTo] = convert.hex.hsl(to);

const hueSteps = (hueFrom - hueTo) / (steps + 1);
const satSteps = (satFrom - satTo) / (steps + 1);
const lightSteps = (lightFrom - lightTo) / (steps + 1);
console.log({ satFrom, satTo });

const out = Array.from({ length: steps + add }).map((_, i) => {
  return `#${convert.hsl.hex([
    Math.round(hueFrom - hueSteps * (i + 1)),
    Math.round(satFrom - satSteps * (i + 1)),
    Math.round(lightFrom - lightSteps * (i + 1)),
  ])}`;
});

const example = [
  chalk.hex(from),
  ...out.map((c) => chalk.hex(c)),
  chalk.hex(to),
];
console.log(example.map((f) => f('█████████')).join(''));
console.log(example.map((f) => f('█████████')).join(''));
console.log([from, ...out, to].map((s) => ` ${s} `).join(''));
console.log(example.map((f) => f(' ███████ ')).join(''));
console.log(example.map((f) => f(' ███████ ')).join(''));

console.log(
  [from, ...out, to]
    .reverse()
    .map((s) => `xxx: '${s}',`)
    .join('\n'),
);
