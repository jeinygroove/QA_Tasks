const dev = process.env.NODE_ENV !== 'production';

module.exports = {
    server: dev ? '' : 'https://cdn.statically.io/gh/jeinygroove/jeinygroove.github.io/QA_Tasks/gh-pages/'
}
