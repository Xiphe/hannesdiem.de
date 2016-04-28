'use strict';

const fs = require('fs');
const path = require('path');
const date = new Date();
const minimist = require('minimist');
const argv = minimist(process.argv, {
  alias: {
    t: 'tagesform'
  }
});
const isTagesform = !!argv.tagesform;
let topic = process.argv[2];
let other = '';

function leftPad(str, length, pad) {
  str = str + '';
  while(str.length < length) {
    str = pad + str;
  }
  return str;
}

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gmi, '-');
}

const dateStr = `${date.getFullYear()}-`
 + `${leftPad(date.getMonth() + 1, 2, 0)}-`
 + leftPad(date.getDate(), 2, 0);
const timeStr = `${leftPad(date.getHours(), 2, 0)}:`
  + `${leftPad(date.getMinutes(), 2, 0)}:`
  + leftPad(date.getSeconds(), 2, 0);

const cover = isTagesform ? 'tagesform_cover_jtbc9y' : 'diem_himmel_creltn'
const tags = isTagesform ? 'podcasts tagesform ' : '';
const layout = isTagesform ? 'tagesform' : 'post';
const folder = isTagesform ? '_posts/tagesform' : '_posts';

if (isTagesform) {
  topic = `Tagesform ${argv.tagesform}`;
  other += `\nepisode: ${argv.tagesform}`;
}

const fileName = path.join(__dirname, folder, `${dateStr}-${toSlug(topic)}.md`);


const contents = `---
layout: ${layout}
cover: ${cover}${other}
title: ${topic}
date: ${dateStr} ${timeStr}
tags: ${tags}
navigation: true
logo: 'assets/images/logo.svg'
---


`;

fs.writeFile(
  fileName,
  contents,
  'utf8',
  (err) => {
    if (err) {
      process.stderr.write(err);
      process.exit(1);
    }

    process.stdout.write(`${fileName}\n`);
    process.exit(0);
  }
);
