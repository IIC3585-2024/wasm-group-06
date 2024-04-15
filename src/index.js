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

    if (input === '' || isNaN(input)) {
        document.getElementById('error-text').innerHTML = 'Please enter a valid number';
        return 0;
    }

    return parseInt(input);
}

function handleSubmit() {
    const number = parseInt((document.getElementById('input')).value);

    const jsContentBox = document.getElementById('js-content');
    const wasmContentBox = document.getElementById('wasm-content');

    jsContentBox.innerHTML = '';
    wasmContentBox.innerHTML = '';

    const jsResult = getTimeAndFactors(primeFactors, number);
    const wasmResult = getTimeAndFactors(runFromWasm, number);


    jsContentBox.innerHTML += `JS: ${jsResult.factors.join(' * ')}<br>`;
    jsContentBox.innerHTML += `Runtime: ${jsResult.runtime}ms`;

    wasmContentBox.innerHTML += `C: ${wasmResult.factors.join(' * ')}<br>`;
    wasmContentBox.innerHTML += `Runtime: ${wasmResult.runtime}ms`;

}
