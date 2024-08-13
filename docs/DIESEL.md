# DIESEL

DIESEL provides various functions for string and arithmetic operations. This documentation covers functions for arithmetic, comparison, logical operations, and string manipulations.

> [!NOTE]
> This documentation is based on the original DIESEL documentation available at [Fourmilab](https://www.fourmilab.ch/diesel/). AutoCAD DIESEL functions are **not supported** in this library.

## Arithmetic Functions

Functions for performing basic arithmetic operations:

- `$(+,<val1>,<val2>,...<valn>)`
  - Returns the sum of the numbers `<val1>`, `<val2>`, ... `<valn>`.

- `$(-,<val1>,<val2>,...<valn>)`
  - Returns the result of subtracting the numbers `<val2>` through `<valn>` from `<val1>`.

- `$(*,<val1>,<val2>,...<valn>)`
  - Returns the result of multiplying the numbers `<val1>`, `<val2>`, ... `<valn>`.

- `$(/,<val1>,<val2>,...<valn>)`
  - Returns the result of dividing the number `<val1>` by `<val2>`, ... `<valn>`.

## Comparison Functions

Functions for comparing values and strings:

- `$(=,<val1>,<val2>)`
  - Returns `1` if the numbers `<val1>` and `<val2>` are equal, otherwise returns `0`.

- `$(<,<val1>,<val2>)`
  - Returns `1` if the number `<val1>` is less than `<val2>`, otherwise returns `0`.

- `$(>,<val1>,<val2>)`
  - Returns `1` if the number `<val1>` is greater than `<val2>`, otherwise returns `0`.

- `$(!=,<val1>,<val2>)`
  - Returns `1` if the numbers `<val1>` and `<val2>` are not equal, otherwise returns `0`.

- `$(<=,<val1>,<val2>)`
  - Returns `1` if the number `<val1>` is less than or equal to `<val2>`, otherwise returns `0`.

- `$(>=,<val1>,<val2>)`
  - Returns `1` if the number `<val1>` is greater than or equal to `<val2>`, otherwise returns `0`.

## Logical Functions

Functions for performing bitwise logical operations:

- `$(AND,<val1>,<val2>,...<valn>)`
  - Returns the bitwise logical AND of the integers `<val1>` through `<valn>`.

- `$(OR,<val1>,<val2>,...<valn>)`
  - Returns the bitwise logical OR of the integers `<val1>` through `<valn>`.

- `$(XOR,<val1>,<val2>,...<valn>)`
  - Returns the bitwise logical XOR of the integers `<val1>` through `<valn>`.

## String Functions

Functions for manipulating and analyzing strings:

- `$(EQ,<val1>,<val2>)`
  - Returns `1` if the strings `<val1>` and `<val2>` are identical, otherwise returns `0`.

- `$(EVAL,<str>)`
  - Evaluates the string `<str>` using the DIESEL evaluator and returns the result.

- `$(FIX,<value>)`
  - Truncates the real number `<value>` to an integer by discarding any fractional part.

- `$(IF,<expr>,<dotrue>,<dofalse>)`
  - Evaluates and returns `<dotrue>` if `<expr>` is nonzero, otherwise evaluates and returns `<dofalse>`. The branch not chosen is not evaluated.

- `$(INDEX,<which>,<string>)`
  - Extracts and returns the value from `<string>`, which is delimited by commas. `<which>` selects the value, with the first item numbered zero.

- `$(NTH,<which>,<arg0>,<arg1>,...<argN>)`
  - Evaluates and returns the argument selected by `<which>`. `<which>` starts at `0` for `<arg0>`, and so on. Unlike `$(INDEX)`, it returns one of a series of arguments to the function, while `$(INDEX)` extracts a value from a comma-delimited string.

- `$(STRFILL,<string>,<ncopies>)`
  - Returns the result of concatenating `<ncopies>` of `<string>`.

- `$(STRLEN,<string>)`
  - Returns the length of `<string>` in characters.

- `$(SUBSTR,<string>,<start>,<length>)`
  - Returns the substring of `<string>` starting at character `<start>` and extending for `<length>` characters. If `<length>` is omitted, returns the entire remaining length of the string. Characters are numbered from `1`.

- `$(UPPER,<string>)`
  - Converts `<string>` to uppercase according to the rules of the current locale and returns it.

## Variables

- `$(GETVAR,varname)`
  - Returns the value stored in `varname`. If no variable with the name `varname` exists, a bad argument error is reported.

- `$(SETVAR,varname,value)`
  - Stores the string `value` into `varname`. If no variable called `varname` exists, a new variable is created.

## Errors

Generally, if you make a mistake in a DIESEL expression, what went wrong may not be obvious. Depending on the nature of the error, DIESEL embeds an error indication in the output stream.

- `$?`
  - Syntax error (usually a missing right parenthesis or a runaway string)

- `$(func,??)`
  - Incorrect argument to function `func`

- `$(func)??`
  - Unknown function `func`

- `$(++)`
  - Output string too long—evaluation truncated

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
