//This file contains various opening positions
const STANDARD_GAME = [
    ['Rb', 'Nb', 'Bb', 'Qb', 'Kb', 'Bb', 'Nb', 'Rb'],
    ['Pb', 'Pb', 'Pb', 'Pb', 'Pb', 'Pb', 'Pb', 'Pb'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['Pw', 'Pw', 'Pw', 'Pw', 'Pw', 'Pw', 'Pw', 'Pw'],
    ['Rw', 'Nw', 'Bw', 'Qw', 'Kw', 'Bw', 'Nw', 'Rw'],
];

const ITALIAN_GAME = [
    ['Rb', null, 'Bb', 'Qb', 'Kb', 'Bb', 'Nb', 'Rb'],
    ['Pb', 'Pb', 'Pb', 'Pb', null, 'Pb', 'Pb', 'Pb'],
    [null, null, 'Nb', null, null, null, null, null],
    [null, null, null, null, 'Pb', null, null, null],
    [null, null, 'Bw', null, 'Pw', null, null, null],
    [null, null, null, null, null, 'Nw', null, null],
    ['Pw', 'Pw', 'Pw', 'Pw', null, 'Pw', 'Pw', 'Pw'],
    ['Rw', 'Nw', 'Bw', 'Qw', 'Kw', null, null, 'Rw'],
];

const SICILIAN1 = [
    ['Rb', 'Nb', 'Bb', 'Qb', 'Kb', 'Bb', 'Nb', 'Rb'],
    ['Pb', 'Pb', null, 'Pb', 'Pb', 'Pb', 'Pb', 'Pb'],
    [null, null, null, null, null, null, null, null],
    [null, null, 'Pb', null, null, null, null, null],
    [null, null, null, null, 'Pw', null, null, null],
    [null, null, null, null, null, null, null, null],
    ['Pw', 'Pw', 'Pw', 'Pw', null, 'Pw', 'Pw', 'Pw'],
    ['Rw', 'Nw', 'Bw', 'Qw', 'Kw', 'Bw', 'Nw', 'Rw'],
];

const QUEENSGAMBITDECLINED = [
    ['Rb', 'Nb', 'Bb', 'Qb', 'Kb', 'Bb', 'Nb', 'Rb'],
    ['Pb', 'Pb', 'Pb', null, null, 'Pb', 'Pb', 'Pb'],
    [null, null, null, null, 'Pb', null, null, null],
    [null, null, null, 'Pb', null, null, null, null],
    [null, null, 'Pw', 'Pw', null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['Pw', 'Pw', null, null, 'Pw', 'Pw', 'Pw', 'Pw'],
    ['Rw', 'Nw', 'Bw', 'Qw', 'Kw', 'Bw', 'Nw', 'Rw'],
];

const RUYLOPEZ = [
    ['Rb', null, 'Bb', 'Qb', 'Kb', 'Bb', 'Nb', 'Rb'],
    ['Pb', 'Pb', 'Pb', null, null, 'Pb', 'Pb', 'Pb'],
    [null, null, 'Nb', 'Pb', null, null, null, null],
    [null, 'Bw', null, null, 'Pb', null, null, null],
    [null, null, null, null, 'Pw', null, null, null],
    [null, null, null, null, null, 'Nw', null, null],
    ['Pw', 'Pw', 'Pw', 'Pw', null, 'Pw', 'Pw', 'Pw'],
    ['Rw', 'Nw', 'Bw', 'Qw', 'Kw', null, null, 'Rw'],
];

const KINGSGAMBITACCEPTED = [
    ['Rb', 'Nb', 'Bb', 'Qb', 'Kb', 'Bb', 'Nb', 'Rb'],
    ['Pb', 'Pb', 'Pb', 'Pb', null, 'Pb', 'Pb', 'Pb'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, 'Pw', 'Pb', null, null],
    [null, null, null, null, null, null, null, null],
    ['Pw', 'Pw', 'Pw', 'Pw', null, null, 'Pw', 'Pw'],
    ['Rw', 'Nw', 'Bw', 'Qw', 'Kw', 'Bw', 'Nw', 'Rw'],
];

const KINGSGAMBITDECLINED = [
    ['Rb', 'Nb', 'Bb', 'Qb', 'Kb', 'Bb', 'Nb', 'Rb'],
    ['Pb', 'Pb', 'Pb', null, null, 'Pb', 'Pb', 'Pb'],
    [null, null, null, 'Pb', null, null, null, null],
    [null, null, null, null, 'Pb', null, null, null],
    [null, null, null, null, 'Pw', 'Pw', null, null],
    [null, null, null, null, null, null, null, null],
    ['Pw', 'Pw', 'Pw', 'Pw', null, null, 'Pw', 'Pw'],
    ['Rw', 'Nw', 'Bw', 'Qw', 'Kw', 'Bw', 'Nw', 'Rw'],
];

module.exports = {STANDARD_GAME, ITALIAN_GAME}
