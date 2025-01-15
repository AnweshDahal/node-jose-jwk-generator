const readline = require("node:readline");
const jose = require("jose");
const fs = require("fs");
const crypto = require("crypto");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Please ensure the public key is in this directory.");

rl.question(
  "Is the public key available here? Yes: 1 | No: 0 (default: No): ",
  (ans) => {
    if (ans !== "1") {
      console.log("Public key not found. Exiting...");
      rl.close();
      return;
    }

    rl.question(
      "Enter the public key file name (default: publickey.pem): ",
      async (name) => {
        const publicKeyPath = `./${name || "publickey.pem"}`;

        if (!fs.existsSync(publicKeyPath)) {
          console.log(`Error: The file "${publicKeyPath}" does not exist.`);
          rl.close();
          return;
        }

        try {
          const file = fs.readFileSync(publicKeyPath, "utf-8");
          const key = await jose.importSPKI(file, "RS256");
          const jwk = await jose.exportJWK(key);

          // Generate `kid` as a SHA-256 hash of the public key
          const kid = crypto
            .createHash("sha256")
            .update(file)
            .digest("base64url");

          // Add the `kid` to the JWK
          jwk.kid = kid;

          // Output the formatted JWK
          console.log("Generated JWK:");
          console.log(JSON.stringify(jwk, null, 2));
        } catch (error) {
          console.error("Error processing the public key:", error.message);
        }

        rl.close();
      }
    );
  }
);

rl.on("close", () => {
  process.exit(0);
});
