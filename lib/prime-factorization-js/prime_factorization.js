function getFactor(factor, number) {
    const factors = [];
    while (number % factor === 0) {
        factors.push(factor);
        number /= factor;
    }
    return {factors, number};
}

function getFactorsOfTwo(number) {
    return getFactor(2, number);
}

function getFactorsOfOddNumbers(number) {
    let factors = [];
    const sqrtNumber = Math.sqrt(number);
    for (let i = 3; i <= sqrtNumber; i += 2) {
        const result = getFactor(i, number);
        factors = [...factors, ...result.factors];
        number = result.number;
    }
    return {factors, number};
}

function primeFactors(number) {
    let {factors, number: newNumber} = getFactorsOfTwo(number);

    const result = getFactorsOfOddNumbers(newNumber);
    factors = [...factors, ...result.factors];
    newNumber = result.number;

    if (newNumber > 2) {
        factors.push(newNumber);
    }

    return factors;
}
