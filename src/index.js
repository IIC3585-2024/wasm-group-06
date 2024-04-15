function getTimeAndFactors(func, number) {
    const PRECISION_DIGITS = 2;

    const startTime = performance.now();
    const factors = func(number);

    const runtime = (performance.now() - startTime).toFixed(PRECISION_DIGITS);
    return {factors, runtime};
}

function runFromWasm(number) {
    const uint32Array = new Uint32Array(50000);

    const pointer = Module._malloc(uint32Array.length * uint32Array.BYTES_PER_ELEMENT);
    Module.HEAPU32.set(uint32Array, pointer / uint32Array.BYTES_PER_ELEMENT);

    Module._factorize(number, pointer);

    const factors = [];

    let i = 0;
    while (Module.HEAPU32[pointer / uint32Array.BYTES_PER_ELEMENT + i] !== 0) {
        factors.push(Module.HEAPU32[i + (pointer / uint32Array.BYTES_PER_ELEMENT)]);
        i++;
    }

    Module._free(pointer);

    return factors;
}

function getAndValidateInput() {
    const input = document.getElementById('input').value;
    const errorElement = document.getElementById('error');

    if (input === '' || isNaN(input) || parseInt(input) < 1) {
        errorElement.innerHTML = 'Ingresa un número válido';
        return 0;
    }
    errorElement.innerHTML = '';
    return parseInt(input);
}

function buildResultsBoxes(numbers, element) {
    element.innerHTML = '';

    numbers.forEach(number => {
        const div = document.createElement('div');
        div.className = "flex flex-col min-w-24 h-12 px-2 py-1 items-center text-lg justify-center bg-primary rounded-lg text-white shadow-sm";
        div.textContent = number;
        element.appendChild(div);
    });
}

function buildTimeBadges(time, element) {
    element.innerHTML = '';

    const div = document.createElement('div');
    div.className = "flex flex-col min-w-24 px-2 py-1 items-center justify-center rounded-lg text-white shadow-sm bg-gray-800 rounded-lg";
    div.textContent = `Tiempo de ejecución: ${time} ms`;
    element.appendChild(div);
}


function handleSubmit() {
    const number = getAndValidateInput();
    if (number === 0) {
        return;
    }

    const jsContentBox = document.getElementById('js-content');
    const wasmContentBox = document.getElementById('wasm-content');

    const jsTimeBox = document.getElementById('js-time');
    const wasmTimeBox = document.getElementById('wasm-time');


    const jsResult = getTimeAndFactors(primeFactors, number);
    const wasmResult = getTimeAndFactors(runFromWasm, number);

    buildTimeBadges(jsResult.runtime, jsTimeBox);
    buildTimeBadges(wasmResult.runtime, wasmTimeBox);


    buildResultsBoxes(jsResult.factors, jsContentBox);
    buildResultsBoxes(wasmResult.factors, wasmContentBox);

}
