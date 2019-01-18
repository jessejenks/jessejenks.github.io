let ruleDefinitions = [
    ['Maze', [1,2,3,4,5],[3],],
    ['Mazectric',[1,2,3,4],[3],'Charles A. Rockafellor'],
    ['Maze with Mice',[1,2,3,4,5],[3,7]],
    // ['Electric Maze',[1,2,3,4],[4,5]],
    ['Coral',[4,5,6,7,8],[3]],
    ['Day and Night',[3,4,6,7,8],[3,4,6,7,8],'Nathan Thompson'],
    // ['gnarl',[1],[1],'Kellie Evans'],
    ['Walled Cities',[2,3,4,5],[4,5,6,7,8],'David Macfarlane'],
    ['The Game of Life',[2,3],[3],'John Conway'],
    ['Amoeba', [1,3,5,8], [3,5,7]],
    ['Coagulations', [2,3,5,6,7,8], [3,7,8]],
    ['Diamoeba', [5,6,7,8], [3,5,6,7,8], 'Dean Hickerson'],
    ['Move', [2,4,5], [3,6,8]],
    ['Stains', [2,3,5,6,7,8], [3,6,7,8]],
    // ['Serviettes', [], [2,3,4], ''],
    ['Long life', [5], [3,4,5], 'Andrew Trevorrow'],
    ['Flakes', [0,1,2,3,4,5,6,7,8], [3], 'Janko Gravner'],
    ['34 Life',[3,4],[3,4]],
    ['2x2',[1,2,5],[3,6]],
    ['Assimilation',[4,5,6,7],[3,4,5]],
    // ['replicator',[1,3,5,7],[1,3,5,7]],
    ['Branchy', [2,3,4,5,7],[2], 'me :)'],

    ['Rocket City', [3,4,5,6,7,8], [2], 'me :)'],
    ['Blinking Pyramids', [3,4,5,6,7,8], [1,2], 'me :)'],

    // ['islands', [5,6,7,8], [2,3,6], 'me :)'],
    ['Shrinkify',[0,1,2,4,5,6,7], [4],'me :)'],

    // ['seizure-moeba', [3,4], [0,1,3], 'the gods'],
    // ['Deconstruction', [0,4,5,6,7,8], [2,3,5,8], 'me :)'],
    ['Deconstruction', [0,2,5], [], 'me :)'],
    ['Honeycomb', [2,3,4,5,6,8],[4], 'me :)'],
    ['Collapse', [4,5,8], [6], 'me :)'],
    ['Blinkies', [1,3,4,6], [3], 'me :)'],
    // ['rocket city', [5], [2,5,7,8], 'me :)'],
    // ['Rocket City', [3,4,5,6,7,8], [2], 'me :)'],
    // 2,3,4,6
    // 1,2,3,4,6,7
    // ['??', [0, 1, 3, 4, 7, 8], [3, 5]],
    // ['??', [0,1,4,7], [2,7]],
    // ['??', [0, 6], [1]]


    // formerly Worms
    // ['Dissolve',[3,5,6,7],[3,6,7],'me :)'],

        // ['static maze', [2,3,4], [1,3,7], 'the Gods of Chaos'],
    // ['randomly generated 3', [4,5,7,8], [1,2], 'the Gods of Chaos'],
    ['Art',[0,1,3,4],[1], 'me :)'],
    ['Butterfly', [3,4,7,8],[3], 'me :)'],




    // [1,2,6,7,8],[4]
    // [1,5,8], [0]
    // [0,1,3,4,5,7], [1,2]
    // shrinks to nothing
    // [0,1,5,6,7,8], [8]
    // kinda seizure-y but nice patterns
    // [8], [1,2,3,4,5,8]
    // flames-ish
    // [1,3,4,6,8], [3,4]
    // ['identity',[1,2,3,4,5,6,7,8],[]]
];

// let randRule = ['randomly generated rule', [], []];
// for (let i = 0; i<=8; i++) if (Math.random() < .5) randRule[1].push(i);
// for (let i = 1; i<=8; i++) if (Math.random() < .1) randRule[2].push(i);

// ruleDefinitions.push(randRule);
// console.log(randRule)

