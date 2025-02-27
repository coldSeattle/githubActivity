// index.ts

import { getGitHubUsernameFromArgs } from "./cli";
import { fetchGitHubActivity } from "./api";
import { printActivity } from "./utils";

async function main() {
  const username = getGitHubUsernameFromArgs();
  if (!username) return;

  try {
    const activity = await fetchGitHubActivity(username);
    printActivity(activity);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
