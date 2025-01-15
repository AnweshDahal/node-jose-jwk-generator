# JWK Generator

This is a simple NodeJS application to generate JWK from your `.pem` public keys/.

## Install

1. Clone the repo
2. Install the dependencies

```bash
npm i
```

## Setup

1. Copy the public key into this folder, the name may be anything, `publickey.pem` is default.

## Use

1. Run

```bash
npm start
```

2. Follow through the process and copy the generated JWK Object
3. Paste it into the `keys` array of your JWK file where you have deployed it and save the changes.
