function getFactor(factor, number) {
    let factors = [];
    while (number % factor === 0) {
        factors.push(factor);
        number = number / factor;
    }
    return {factors, number};
}

function getFactorsOfTwo(number) {
    return getFactor(2, number);
}

function getFactorsOfOddNumbers(number) {
    let factors = [];
    for (let i = 3; i <= Math.sqrt(number); i = i + 2) {
        let result = getFactor(i, number);
        factors = factors.concat(result.factors);
        number = result.number;
    }
    return {factors, number};
}

function primeFactors(number) {
    let result = getFactorsOfTwo(number);
    let factors = result.factors;
    number = result.number;

    result = getFactorsOfOddNumbers(number);
    factors = factors.concat(result.factors);
    number = result.number;

    if (number > 2) {
        factors.push(number);
    }

    return factors;
}
