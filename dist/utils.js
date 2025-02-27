"use strict";
// src/utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.printActivity = printActivity;
function printActivity(activity) {
    if (activity.length === 0) {
        console.log("No recent activity found.");
        return;
    }
    console.log("\nRecent GitHub Activity:");
    activity.forEach((event) => console.log(`- ${event}`));
}
