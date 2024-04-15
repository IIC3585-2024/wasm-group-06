# Prime Factorization - WASM vs Native JS

This repository contains code demonstrating the integration of WebAssembly (WASM) with C/C++ to solve the prime factorization problem within a web environment. Using Emscripten, the C/C++ algorithm is compiled into a Wasm module. The repository includes comparative implementation in JavaScript to showcase the performance enhancements achieved through Wasm. Additionally, it provides a web interface for users to explore and compare the execution times of both solutions.

## Web

Available in:  [https://wasm.cparedesr.com/](https://wasm.cparedesr.com/)

## How to run

### Install Emscripten

Follow this steps:
```
# Get the emsdk repo
git clone https://github.com/emscripten-core/emsdk.git

# Enter that directory
cd emsdk

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active" for the current user. (writes .emscripten file)
./emsdk activate latest

# Activate PATH and other environment variables in the current terminal
source ./emsdk_env.sh
```

### Compile C code to WASM

```
# Enter lib directory
cd lib/prime-factorization-c

# Run makefile
make
```

### Usage

Open `index.html` file in browser, then enter a number, click "Factorizar" and watch the prime factors of the number.

## Supported Features

- [x] 32-bit Integers
- [ ] 64-bit Integers

## Native JS vs WASM

Comparing both JavaScript and WebAssembly approaches is crucial for understanding the performance benefits of using Wasm for computationally intensive tasks like prime factorization. JavaScript, being an interpreted language, may struggle with the exponential complexity of certain algorithms, leading to longer execution times. On the other hand, Wasm offers a compiled, low-level execution environment that can significantly improve performance for such tasks.

## Team

- Valentina Campaña
- Cristóbal Carrasco
- Carlos Paredes