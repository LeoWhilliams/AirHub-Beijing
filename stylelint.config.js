export default {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
    'no-descending-specificity': null,
    'custom-property-pattern': null,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'scss/at-mixin-pattern': null,
    'scss/at-function-pattern': null
  },
  ignoreFiles: ['dist/**', 'node_modules/**']
}
