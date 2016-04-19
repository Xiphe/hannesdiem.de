'use strict';

const fs = require('fs');
const path = require('path');
const date = new Date();
const topic = process.argv[2];

function leftPad(str, length, pad) {
  str = str + '';
  while(str.length < length) {
    str = pad + str;
  }
  return str;
}

const dateStr = `${date.getFullYear()}-`
 + `${leftPad(date.getMonth() + 1, 2, 0)}-`
 + leftPad(date.getDate(), 2, 0);
const timeStr = `${leftPad(date.getHours(), 2, 0)}:`
  + `${leftPad(date.getMinutes(), 2, 0)}:`
  + leftPad(date.getSeconds(), 2, 0);
const fileName = path.join(__dirname, '_posts', `${dateStr}-${topic}.md`);

const contents = `---
layout: post
cover: 'assets/images/cover/small_path.jpg'
title: ${topic}
date: ${dateStr} ${timeStr}
tags:
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
