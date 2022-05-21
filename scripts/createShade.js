const convert = require('color-convert');
const chalk = require('chalk');

const from = '#022456';
const to = '#1e236f';
const steps = 4;

const [hueFrom, satFrom, lightFrom] = convert.hex.hsl(from);
const [hueTo, satTo, lightTo] = convert.hex.hsl(to);

const hueSteps = (hueFrom - hueTo) / (steps + 1);
const satSteps = (satFrom - satTo) / (steps + 1);
const lightSteps = (lightFrom - lightTo) / (steps + 1);

const out = Array.from({ length: steps }).map((_, i) => {
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

const black = {
  DEFAULT: '#020024',
  50: '#022455',
  100: '#021E50',
  200: '#02194B',
  300: '#011446',
  400: '#010F41',
  500: '#010A3C',
  600: '#010538',
  700: '#00012E',
  800: '#020024',
  900: '#010015',
  1000: '#000000',
};

const blue = {
  DEFAULT: '#1e236f',
  50: '#3f1ace',
  100: '#341CBA',
  200: '#2B1DA5',
  300: '#231F93',
  400: '#1F207F',
  500: '#1e236f',
  600: '#17236D',
  700: '#112369',
  800: '#0B2260',
  900: '#06225B',
};

const violet = {
  DEFAULT: '#ae1ee4',
  50: '#F42FF1',
  100: '#DF28F0',
  200: '#C924EB',
  300: '#ae1ee4',
  400: '#9E1BE4',
  500: '#8D1AE0',
  600: '#7A1ADB',
  700: '#6E1BDA',
  800: '#5C1AD5',
  900: '#4E1AD1',
};

const pink = {
  DEFAULT: '#F934E5',
  50: '#FFFFFF',
  100: '#fff8fb',
  200: '#FFE5F2',
  300: '#FFCCE9',
  400: '#FFB8E4',
  500: '#FF9EE0',
  600: '#ff8ce2',
  700: '#FE6DE1',
  800: '#FB50E2',
  900: '#F934E5',
};

const c = Object.entries(pink)
  .filter(([k]) => k !== 'DEFAULT')
  .map((c) => chalk.hex(c[1]))
  .concat(
    Object.entries(violet)
      .filter(([k]) => k !== 'DEFAULT')
      .map((c) => chalk.hex(c[1])),
  )
  .concat(
    Object.entries(blue)
      .filter(([k]) => k !== 'DEFAULT')
      .map((c) => chalk.hex(c[1])),
  )
  .concat(
    Object.entries(black)
      .filter(([k]) => k !== 'DEFAULT')
      .map((c) => chalk.hex(c[1])),
  );
console.log(c.map((f) => f('██')).join(''));
