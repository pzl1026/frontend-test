const { tokenizer } = require('./compiler');
const { inspect } = require('util');

const node = '<div id="node"><span style="width:100px">44444</span></div>';

// console.log(inspect(tokenizer(node), { showHidden: false, depth: null }));
let htmlexr = /[0-9a-zA-Z;\=\"\:]/g;
result = htmlexr.exec('"');
// console.log(htmlexr.test('style="width: 100px"'));
// console.log(result[0].replace(/^(.*)>$/, ''));
let nn = node.substring(node.indexOf('>') + 1, node.lastIndexOf('</'));
// console.log(nn, 'node');
// let PROPS = /\"(.*)\"/;
// console.log(PROPS.test('"node"'));
