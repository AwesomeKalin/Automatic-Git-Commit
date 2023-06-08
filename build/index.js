"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_git_1 = __importDefault(require("simple-git"));
const yargs_1 = __importDefault(require("yargs"));
const argv = (0, yargs_1.default)(process.argv.slice(2)).options({
    repo: { "type": "string", "description": "The repo that you want to auto-commit", "required": true },
    minutes: { "type": "number", "description": "How often you want to auto-commit", "default": 10 }
}).parseSync();
function autoCommit() {
    console.log('Committing files');
    const date = new Date();
    const git = (0, simple_git_1.default)(argv.repo);
    git.add('.');
    git.commit(`${date.getFullYear}-${date.getMonth}-${date.getDate} ${date.getHours}:${date.getMinutes} Auto Commit`);
    git.push('origin');
}
setInterval(autoCommit, argv.minutes * 60 * 1000);
