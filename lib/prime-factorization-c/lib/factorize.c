#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define VLong unsigned int
#define MAX_ARRAY_SIZE 10000
#define FIRST_PRIME 2

void store_factor(VLong factor, VLong* number, VLong* factors, int* factors_count) {
    while (*number % factor == 0) {
        factors[*factors_count] = factor;
        *factors_count += 1;

        *number = *number / factor;
    }
}

void factorize_by_two(VLong* number, VLong* factors, int* factors_count) {
    store_factor(FIRST_PRIME, number, factors, factors_count);
}


void factorize_by_odd_numbers(VLong* number, VLong* factors, int* factors_count) {
    for (VLong i = FIRST_PRIME + 1; i <= sqrt(*number); i = i + 2) {
        store_factor(i, number, factors, factors_count);
    }
}

void factorize(VLong number, VLong* factors) {
    if (factors == NULL) {
        printf("Error: factors pointer is NULL\n");
        return;
    }

    int factors_count = 0;
    factorize_by_two(&number, factors, &factors_count);
    factorize_by_odd_numbers(&number, factors, &factors_count);

    if (number > FIRST_PRIME) {
        factors[factors_count] = number;
    }
}

int main(int argc, char* argv[]) {
    return 0;
}
