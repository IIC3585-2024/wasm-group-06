CC=gcc -std=gnu11
PROGRAM=factorize
SRC_DIR=lib

OPT=-O3
EXPORTED_FUNCTIONS="['_factorize', '_free', '_malloc']"

wasm:
	emcc -O3 -s WASM=1 -s EXPORTED_FUNCTIONS=$(EXPORTED_FUNCTIONS) -I$(SRC_DIR) $(SRC_DIR)/$(PROGRAM).c -o $(PROGRAM).js

all:
	$(CC) $(OPT) -I$(SRC_DIR) $(SRC_DIR)/$(PROGRAM).c -o $(PROGRAM)

clean:
	rm -f $(PROGRAM)
