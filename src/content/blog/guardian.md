---
title: "Guardian: A Comprehensive Data Validation Library for JavaScript"
author: "Serhii Pimenov"
date: 2025-06-24
cover: {
    src: "/images/blog/police-45.svg"
}
description: "Guardian is a powerful, lightweight JavaScript library designed for data validation."
tags: ["javascript", "user input", "validation", "library"]
category: "JavaScript Libraries"
slug: guardian
---

# Guardian: A Comprehensive Data Validation Library for JavaScript

[Project Source](https://github.com/olton/guardian) | [NPM Package](https://www.npmjs.com/package/@olton/guardian) | [Documentation](https://v5.metroui.org.ua/libraries/guardian/)

## Introduction

Guardian is a powerful, lightweight JavaScript library designed for data validation. Whether you're validating user input in a form, checking API responses, or ensuring data integrity in your application, Guardian provides a simple yet flexible way to define validation rules and apply them to your data.

This guide is intended for beginner programmers who want to understand how to use Guardian to validate data in their JavaScript applications.

<!-- -->

## What is Data Validation?

Data validation is the process of ensuring that data meets certain criteria before it's processed by your application. For example, you might want to ensure that:

- An email address is properly formatted
- A password meets minimum length requirements
- A number falls within a specific range
- A credit card number is valid

Without proper validation, your application might process invalid data, leading to bugs, security vulnerabilities, or poor user experience.

## Getting Started with Guardian

### Installation

You can install Guardian using npm:

```bash
npm i @olton/guardian
```

### Basic Usage

Guardian uses a schema-based approach to validation. You define a schema (a set of rules) and then validate your data against that schema.

Here's a simple example:

```javascript
import { string, safeParse } from '@olton/guardian';

// Create a schema that validates strings
const schema = string();

// Validate data against the schema
const result = safeParse(schema, "Hello, world!");

// Check if validation passed
if (result.ok) {
    console.log("Validation passed!");
} else {
    console.error("Validation failed:", result.error);
}
```

## Core Concepts

### Guardians

Guardians are functions that validate specific aspects of your data. Guardian provides many built-in guardians for common validation needs:

- **Type Validation**: `string()`, `number()`, `boolean()`, `array()`, `object()`, etc.
- **String Validation**: `email()`, `url()`, `pattern()`, etc.
- **Number Validation**: `min()`, `max()`, `between()`, `integer()`, etc.
- **Array Validation**: `length()`, `minLength()`, `maxLength()`
- **Special Formats**: `creditCard()`, `ip()`, `base64()`, etc.

### Combining Guardians

Guardian allows you to combine multiple validators using `pipe()` or `compose()` functions:

```javascript
import { pipe, string, minLength, maxLength, safeParse } from '@olton/guardian';

// Create a schema for a username: must be a string between 3 and 20 characters
const usernameSchema = pipe(
    string(),
    minLength(3),
    maxLength(20)
);

// Validate a username
const result = safeParse(usernameSchema, "john_doe");
```

### Validation Results

When you validate data using `safeParse()`, you get a result object with:

- `ok`: A boolean indicating whether validation passed
- `value`: The validated value (if validation passed)
- `error`: The validation error (if validation failed)

## Common Validation Scenarios

### Form Validation

```javascript
import { pipe, object, string, email, minLength, number, min, max, safeParse } from '@olton/guardian';

// Define a schema for a user registration form
const userSchema = object({
    username: pipe(string(), minLength(3)),
    email: email(),
    password: pipe(string(), minLength(8)),
    age: pipe(number(), min(18), max(120))
});

// Validate form data
const formData = {
    username: "john_doe",
    email: "john@example.com",
    password: "securepassword123",
    age: 25
};

const result = safeParse(userSchema, formData);

if (result.ok) {
    // Process valid form data
} else {
    // Show validation errors to the user
}
```

### API Data Validation

```javascript
import { pipe, array, object, string, number, safeParse } from '@olton/guardian';

// Define a schema for API response data
const productSchema = object({
    id: string(),
    name: string(),
    price: pipe(number(), min(0)),
    categories: array(string())
});

// Validate API response
fetch('https://api.example.com/products')
    .then(response => response.json())
    .then(data => {
        const result = safeParse(productSchema, data);
        if (result.ok) {
            // Process valid data
        } else {
            // Handle invalid data
        }
    });
```

## Creating Custom Validators

You can create custom validators for specific validation needs:

```javascript
import { GuardianError } from '@olton/guardian';

// Custom validator for US phone numbers
const usPhoneNumber = (errorMessage = "Invalid US phone number") => {
    return function(input) {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (typeof input !== "string" || !phoneRegex.test(input)) {
            return new GuardianError(errorMessage, "usPhoneNumber", input);
        }
        return input;
    };
};

// Use the custom validator
const phoneSchema = usPhoneNumber();
const result = safeParse(phoneSchema, "(555) 123-4567");
```

## Error Handling

Guardian provides detailed error information when validation fails:

```javascript
import { pipe, string, email, safeParse } from '@olton/guardian';

const emailSchema = email();
const result = safeParse(emailSchema, "invalid-email");

if (!result.ok) {
    console.log(result.error.message); // Error message
    console.log(result.error.type);    // Type of validation that failed
    console.log(result.error.value);   // The invalid value
}
```

## Best Practices

1. **Define schemas once, use them multiple times**: Create reusable schemas for common validation patterns.
2. **Combine validators for complex rules**: Use `pipe()` to create sophisticated validation rules.
3. **Provide custom error messages**: Make error messages user-friendly and specific.
4. **Validate early**: Validate data as soon as you receive it to catch errors early.
5. **Handle validation errors gracefully**: Show helpful error messages to users.

## Conclusion

Guardian provides a powerful, flexible approach to data validation in JavaScript. By using Guardian, you can ensure that your application processes only valid data, improving reliability and user experience.

As you become more comfortable with Guardian, you'll discover more advanced features and patterns that can help you solve complex validation challenges.

## Further Resources

- [Official Documentation](https://docs-new.metroui.org.ua/libraries/guardian)
- [GitHub Repository](https://github.com/olton/guardian)

Happy validating!