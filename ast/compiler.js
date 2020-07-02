function tokenizer(node) {
  let current = 0;
  let tokens = [];
  let STR = /[0-9a-zA-Z]/;
  let WHITESPACE = /\s/;
  let TAG = /[\<0-9a-zA-Z]/;

  while (current < node.length) {
    let char = node[current];
    if (char == '<') {
      let value = char;
      let nextChar = node[++current];
      if (STR.test(nextChar) || nextChar == '/') {
        char = node[current];
        while (STR.test(char) || char == '/') {
          value += char;
          char = node[++current];
        }
        let [, tagName] = value.split('<');
        if (tagName.indexOf('/') == -1) {
          tokens.push({
            type: 'tag',
            name: tagName,
          });
        }
      }

      continue;
    }

    if (char === '>') {
      let str = '';
      if (!node[current + 1]) {
        current++;
        continue;
      }
      let chidNode = node.substring(
        node.indexOf('>') + 1,
        node.lastIndexOf('</')
      );
      if (/\</.test(chidNode)) {
        let children = tokenizer(chidNode);
        // let lastIndex = tokens.findLastIndex((m) => m.type == 'tag');
        // if (lastIndex != -1) {
        //   tokens[lastIndex].children = children;
        // }
        tokens[tokens.length - 1].children = children;
        current += chidNode.length;
      } else {
        while (char !== '<') {
          if (!char) break;
          str += char;
          char = node[++current];
        }

        let text = str && str.replace(/\<|\>/g, '');
        tokens[tokens.findIndex((m) => m.type == 'tag')].children = 'text';
      }

      continue;
    }

    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    let PROPS = /[0-9a-zA-Z;\=\"\:]/;
    if (PROPS.test(char)) {
      let str = '';
      while (PROPS.test(char)) {
        str += char;
        char = node[++current];
      }
      let [name, value] = str.split('=');
      if (tokens.length > 0) {
        let tag = tokens[tokens.length - 1];
        tag.props = tag.props || {};
        tag.props[name] = value;
      }

      continue;
    }

    throw new TypeError('I dont know what this character is: ' + char);
  }

  return tokens;
}

module.exports = {
  tokenizer,
};
