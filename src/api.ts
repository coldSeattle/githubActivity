// src/api.ts

export async function fetchGitHubActivity(username: string) {
  const url = `https://api.github.com/users/${username}/events`;

  return new Promise<string[]>(async (resolve, reject) => {
    const options = {
      headers: {
        "User-Agent": "github-activity-cli",
      },
    };
    const https = require("https");

    https
      .get(url, options, (res: any) => {
        let data = "";
        res.on("data", (chunk: string) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const events = JSON.parse(data);
            if (!Array.isArray(events)) {
              reject("Invalid response from GitHub API");
              return;
            }
            const activity = events.map((event) => formatEvent(event));
            resolve(activity);
          } catch (error) {
            reject(`Error parsing response: ${error}`);
          }
        });
      })
      .on("error", () => {
        reject("Failed to fetch data from GitHub API");
      });
  });
}

function formatEvent(event: any): string {
  switch (event.type) {
    case "PushEvent":
      return `Pushed ${event.payload.commits?.length || 0} commits to ${
        event.repo.name
      }`;
    case "IssuesEvent":
      return `Opened a new issue in ${event.repo.name}`;
    case "WatchEvent":
      return `Starred ${event.repo.name}`;
    default:
      return `Performed ${event.type} on ${event.repo.name}`;
  }
}
