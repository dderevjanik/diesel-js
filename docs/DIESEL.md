# DIESEL

## Arithmetic Operations

- `$(+, val1, val2, …valn)`
  - **Description**: Returns the sum of the numbers `val1`, `val2`, …`valn`.

- `$(−, val1, val2, …valn)`
  - **Description**: Returns the result of subtracting the numbers `val2` through `valn` from `val1`.

- `$(*, val1, val2, …valn)`
  - **Description**: Returns the result of multiplying the numbers `val1`, `val2`, …`valn`.

- `$(/, val1, val2, …valn)`
  - **Description**: Returns the result of dividing the number `val1` by `val2`, …`valn`.

## Comparison Operations

- `$(=, val1, val2)`
  - **Description**: Returns `1` if the numbers `val1` and `val2` are equal, otherwise returns `0`.

- `$(<, val1, val2)`
  - **Description**: Returns `1` if the number `val1` is less than `val2`, otherwise returns `0`.

- `$(>, val1, val2)`
  - **Description**: Returns `1` if the number `val1` is greater than `val2`, otherwise returns `0`.

- `$(!=, val1, val2)`
  - **Description**: Returns `1` if the numbers `val1` and `val2` are not equal, otherwise returns `0`.

- `$(<=, val1, val2)`
  - **Description**: Returns `1` if the number `val1` is less than or equal to `val2`, otherwise returns `0`.

- `$(>=, val1, val2)`
  - **Description**: Returns `1` if the number `val1` is greater than or equal to `val2`, otherwise returns `0`.

## Logical Operations

- `$(AND, val1, val2, …valn)`
  - **Description**: Returns the bitwise logical AND of the integers `val1` through `valn`.

- `$(OR, val1, val2, …valn)`
  - **Description**: Returns the bitwise logical OR of the integers `val1` through `valn`.

- `$(XOR, val1, val2, …valn)`
  - **Description**: Returns the bitwise logical XOR of the integers `val1` through `valn`.

## String Functions

- `$(EQ, val1, val2)`
  - **Description**: Returns `1` if the strings `val1` and `val2` are identical, otherwise returns `0`.

- `$(EVAL, str)`
  - **Description**: Evaluates the string `str` using the DIESEL evaluator and returns the result.

- `$(FIX, value)`
  - **Description**: Truncates the real number `value` to an integer by discarding any fractional part.

- `$(IF, expr, dotrue, dofalse)`
  - **Description**: Evaluates and returns `dotrue` if `expr` is nonzero; otherwise, evaluates and returns `dofalse`. Note that the branch not chosen by `expr` is not evaluated.

- `$(INDEX, which, string)`
  - **Description**: Extracts and returns a value from the comma-delimited string `string` based on the index `which`, where the first item is numbered zero.

- `$(NTH, which, arg0, arg1, …argN)`
  - **Description**: Evaluates and returns the argument selected by `which`. If `which` is `0`, `arg0` is returned, and so on. Note: Unlike `$(INDEX)`, `$(NTH)` returns one of the series of arguments to the function, while `$(INDEX)` extracts a value from a comma-delimited string passed as a single argument. Arguments not selected by `which` are not evaluated.

- `$(STRFILL, string, ncopies)`
  - **Description**: Returns the result of concatenating `ncopies` of `string`.

- `$(STRLEN, string)`
  - **Description**: Returns the length of `string` in characters.

- `$(SUBSTR, string, start, length)`
  - **Description**: Returns the substring of `string` starting at character `start` and extending for `length` characters. Characters in the string are numbered from 1. If `length` is omitted, the entire remaining length of the string is returned.

- `$(UPPER, string)`
  - **Description**: Returns the `string` converted to upper case according to the rules of the current locale.

## Examples

The functions in the DIESEL string function documentation are quite powerful and can cover a wide range of complex scenarios. Below are some examples of scenarios and how the functions can be used to handle them:

### Conditional Logic in String Processing

Based on a condition, return different strings. For example, if a user-provided value is greater than a threshold, return "High"; otherwise, return "Low".

```lisp
$(IF, $(>, 50, user_value), "High", "Low")
```
**Explanation**: If `user_value` is greater than 50, "High" is returned; otherwise, "Low" is returned.

### Selecting Substrings Dynamically

Extract a specific part of a string based on a dynamically provided start position and length.

```lisp
$(SUBSTR, "DieselFunctionExample", $(INDEX, 1, "5,7"), 3)
```
**Explanation**: This extracts a substring from "DieselFunctionExample" starting at position `7` for `3` characters. If the `which` value from `$(INDEX)` is dynamically provided, it allows flexible extraction.

### String Length Calculation for Dynamic Formatting

Calculate the length of a string and use it to adjust formatting or to create a padded string of a certain length.

```lisp
$(STRFILL, "-", $(STRLEN, "DIESEL") + 10)
```
**Explanation**: This creates a string of hyphens (`-`) with a length equal to the length of the word "DIESEL" plus 10.

### Conditional Evaluation with Multiple Conditions

Check multiple conditions and return a result based on those conditions.

```lisp
$(IF, $(AND, $(=, val1, 10), $(>, val2, 20)), "Condition Met", "Condition Not Met")
```
**Explanation**: This checks if `val1` is equal to 10 and `val2` is greater than 20. If both conditions are true, "Condition Met" is returned; otherwise, "Condition Not Met" is returned.

### Bitwise Operations for Custom Calculations

Perform bitwise operations on integers to customize or manipulate flags/settings.

```lisp
$(XOR, 14, 7)
```
**Explanation**: This performs a bitwise XOR operation between 14 and 7, which could be useful for toggling specific bits in a control word.

### Dynamic String Selection Based on User Input

Select and return a specific value from a list of options based on user input.

```lisp
$(NTH, user_input, "FirstOption", "SecondOption", "ThirdOption")
```
**Explanation**: If `user_input` is 0, "FirstOption" is returned. If it's 1, "SecondOption" is returned, and so on.

### Creating a Repeated Pattern or String

Generate a string that repeats a specific pattern multiple times, useful in formatting or creating specific patterns.

```lisp
$(STRFILL, "*-", 5)
```
**Explanation**: This returns the string "*-*-*-*-*-".

### Complex Evaluations within a Larger Expression

Evaluate a complex expression within a string and dynamically adjust the final output.

```lisp
$(EVAL, "$(+, $(IF, $(>, 10, value), 5, 0), 20)")
```
**Explanation**: If `value` is less than or equal to 10, the final result is 25 (`5 + 20`). Otherwise, it returns 20.

### Conditional Indexing from a String of Values

Extract a value from a string based on a dynamic condition, such as a user selection.

```lisp
$(INDEX, $(IF, $(=, user_choice, 1), 0, 2), "First,Second,Third")
```
**Explanation**: If `user_choice` is 1, it returns "First"; otherwise, it returns "Third".

### String Case Transformation for Uniform Output

Convert a string to upper case before processing it further to ensure consistency in comparison or display.

```lisp
$(UPPER, "diesel functions")
```
**Explanation**: This converts "diesel functions" to "DIESEL FUNCTIONS".
