module.exports = {
  '*.(ts|tsx)': ['eslint', 'jest --findRelatedTests'],
  '**/*.+(js|jsx|json|md)': ['prettier --write', 'git add'],
};
