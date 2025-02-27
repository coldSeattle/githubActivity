// src/utils.ts

export function printActivity(activity: string[]) {
  if (activity.length === 0) {
    console.log("No recent activity found.");
    return;
  }

  console.log("\nRecent GitHub Activity:");
  activity.forEach((event) => console.log(`- ${event}`));
}
