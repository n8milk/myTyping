module.exports = {
    "collectCoverage": true,
    "moduleFileExtensions": ["js", "mjs"],
    "transform": {
        "^.+\\.js$": "babel-jest",
        "^.+\\.mjs$": "babel-jest"
    },
    "testRegex": "((\\.|/*.)(test))\\.js?$"
}