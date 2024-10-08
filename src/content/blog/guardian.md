---
title: Guardian Library
date: 2024-07-22
cover: {
src: https://raw.githubusercontent.com/olton/guardian/master/assets/guardian.svg
}
category: "Libraries"
tags: ["library", "javascript", "validation"]
sort: 1
slug: guardian
draft: false
description: Need input validation? Guardian - Library for validation data according to the specified scheme is in a hurry to help!
---

I'm very excited to introduce the Guardian library as part of the Metro UI project.
The library is designed for data validation according to a pre-built scheme.
Although the library is positioned as part of Metro UI, it can be used separately from Metro UI.

<!-- -->

When used with Metro UI, Guardian is available in the `globalThis.G` namespace.

### Usage Example

#### Checkin one guardian
```javascript
const schema = G.email()
const data = G.parse(schema, "vasya@pupkin.com")
```

#### Checking with a lot of guardians
```javascript
// pipe - check left to right
const schema = G.pipe(required(), email())
const data = G.parse(schema, "vasya@pupkin.com")

// compose - check right to left
const schema = G.compose(required(), email())
const data = G.parse(schema, "vasya@pupkin.com")
```

#### Checking object data
```javascript
const schema = G.object({
    name: string(),
    email: email(),
    cards: object({
        visa: visa(),
        mastercard: mastercard()
    })
})

const data = G.parse(schema, {...})
```

### Parsers
+ [x] - `G.parse()` - Parsing with throw exception
+ [x] - `G.safeParse()` - Parsing without exception

### Pipes
+ [x] `G.pipe()` - pipe with check left to right
+ [x] `G.compose()` - pipe with check right to left


### Available Guardians
- [x] array
- [x] base64
- [x] between
- [x] bigint
- [x] boolean
- [x] bytes
- [x] creditCard (visa, mastercard, discover, jbc, diners, unionPay, americanExpress)
- [x] date
- [x] digits
- [x] domain
- [x] email
- [x] empty
- [x] endsWith
- [x] finite
- [x] float
- [x] func
- [x] hexColor
- [x] imei
- [x] instance
- [x] integer
- [x] ip (ipv4, ipv6)
- [x] length
- [x] maxValue
- [x] minValue
- [x] notNull
- [x] notNumber
- [x] number
- [x] pattern
- [x] promise
- [x] required
- [x] safeInteger
- [x] startsWith
- [x] string
- [x] symbol
- [x] unknown
- [x] url
