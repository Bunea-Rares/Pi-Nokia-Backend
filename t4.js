const grammar = {
    "S": ["Aab"],
    "A": ["aS", "c"]
};

const left = new Map();
const right = new Map();

const searchedGroups = [];

const containsNonTerminal = (arr) => {
    return arr.some(group => group.split("").some(l => l >= "A" && l <= "Z"))
}

const indexOfNonTerminal = (group) => {
    let index = 0;
    group.split("").forEach((e, i) => {
        if(isNonTerminal(e)) {
            index = i;
        }
    })
    return index;
}

const groupContainsNonTerminal = (group) => {
   return group.split("").some(l => l >= "A" && l <= "Z")
}

const isNonTerminal = (e) => e >= "A" && e <= "Z"

const keys = Object.keys(grammar);

const setMap = (map, key, value) => {
    if(map.get(key)) {
        map.set(key, map.get(key).add(value))
    } else {
        map.set(key, value)
    }
}


keys.forEach(nonTerminal => {
    const leftSet = new Set();
    const rightSet = new Set();

    grammar[nonTerminal].forEach(group => {
        if(groupContainsNonTerminal(group)) {
            if(isNonTerminal(group[0])) {
                group.slice(1).split("").forEach(e => rightSet.add(e));
                // goInto(group[0])
            } else {
                group.slice(0, group.length - 2).split("").forEach(e => leftSet.add(e));
                // goInto(group[group.length - 1]
            }
        } else {
            leftSet.add(group);
        }
    })

    setMap(left, nonTerminal, leftSet);
    setMap(right, nonTerminal, rightSet);
});