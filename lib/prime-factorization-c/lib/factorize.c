#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define VLong unsigned int
#define MAX_ARRAY_SIZE 10000

void print_factor(VLong factor, VLong* number, VLong* factors, int* factors_count) {
    while (*number % factor == 0) {
        factors[*factors_count] = factor;
        *factors_count += 1;

        *number = *number / factor;
    }
}

void print_factors_of_two(VLong* number, VLong* factors, int* factors_count) {
    print_factor(2, number, factors, factors_count);
}

void print_factors_of_odd_numbers(VLong* number, VLong* factors, int* factors_count) {
    for (VLong i = 3; i <= sqrt(*number); i = i + 2) {
        print_factor(i, number, factors, factors_count);
    }
}

void factorize(VLong number, VLong* factors) {
    int factors_count = 0;
    print_factors_of_two(&number, factors, &factors_count);
    print_factors_of_odd_numbers(&number, factors, &factors_count);

    if (number > 2) {
        factors[factors_count] = number;
    }
}

int main(int argc, char* argv[]) {
    return 0;
}
