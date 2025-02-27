"use strict";
// src/api.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGitHubActivity = fetchGitHubActivity;
function fetchGitHubActivity(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.github.com/users/${username}/events`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const options = {
                headers: {
                    "User-Agent": "github-activity-cli",
                },
            };
            const https = require("https");
            https
                .get(url, options, (res) => {
                let data = "";
                res.on("data", (chunk) => {
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
                    }
                    catch (error) {
                        reject(`Error parsing response: ${error}`);
                    }
                });
            })
                .on("error", () => {
                reject("Failed to fetch data from GitHub API");
            });
        }));
    });
}
function formatEvent(event) {
    var _a;
    switch (event.type) {
        case "PushEvent":
            return `Pushed ${((_a = event.payload.commits) === null || _a === void 0 ? void 0 : _a.length) || 0} commits to ${event.repo.name}`;
        case "IssuesEvent":
            return `Opened a new issue in ${event.repo.name}`;
        case "WatchEvent":
            return `Starred ${event.repo.name}`;
        default:
            return `Performed ${event.type} on ${event.repo.name}`;
    }
}
