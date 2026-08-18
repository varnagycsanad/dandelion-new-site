import { spawnSync } from "node:child_process";

const steps = [
  ["GSC", ["node", "scripts/remote-platform/geo/fetch-gsc-data.mjs"]],
  ["GA4", ["node", "scripts/remote-platform/geo/fetch-ga4-data.mjs"]]
];

for (const [label, command] of steps) {
  console.log(`GEO fetch indul: ${label}`);
  const result = spawnSync(command[0], command.slice(1), {
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    console.error(`GEO fetch sikertelen: ${label}`);
    process.exit(result.status || 1);
  }

  console.log(`GEO fetch kész: ${label}`);
  console.log("");
}

console.log("GEO teszt fetch kész.");
