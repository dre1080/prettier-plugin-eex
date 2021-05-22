const { tokenizeHTML } = require('prettier-html-templates');
const expressionTypeMatcher = require('./expression_type_matcher');
const { encodeFormForExpressions } = require('./liveview');

function parse(text, parsers, options) {
  let liveViewFormExpressions = [];
  let textWithPlaceholders = text;

  console.log(options.filepath);
  if ((options.filepath.endsWith('.leex') || options.filepath.endsWith('.ex')) && text.includes('</form>')) {
    ({ liveViewFormExpressions, textWithPlaceholders } = encodeFormForExpressions(text));
  }

  return {
    tokens: tokenizeHTML(textWithPlaceholders, /<%[\s\S]*?%>/gm, expressionTypeMatcher),
    liveViewFormExpressions,
  };
}

module.exports = {
  parse,
  astFormat: 'eex-ast',
};
