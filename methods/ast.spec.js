const { Parser, DomHandler } = require('htmlparser2');
const util = require('util');
let handler = new DomHandler(function (err, dom) {
  console.log(util.inspect(dom, { showHidden: false, depth: null }));
});
const parser = new Parser(handler, {
  recognizeCDATA: true,
});

describe('myReduce test', function () {
  it('should myReduce', function () {
    parser.parseComplete(
      '<div id="111" v-model="aa"><span>19238123</span></div>'
    );
  });
});
