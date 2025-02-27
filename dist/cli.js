"use strict";
// src/cli.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitHubUsernameFromArgs = getGitHubUsernameFromArgs;
function getGitHubUsernameFromArgs() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log("Usage: github-activity <GitHubUsername>");
        return null;
    }
    return args[0];
}
