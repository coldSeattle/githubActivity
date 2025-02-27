// src/cli.ts

export function getGitHubUsernameFromArgs(): string | null {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: github-activity <GitHubUsername>");
    return null;
  }
  return args[0];
}
