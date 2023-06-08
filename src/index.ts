import { SimpleGit, simpleGit } from 'simple-git';
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2)).options({
    repo: {"type": "string", "description": "The repo that you want to auto-commit", "required": true},
    minutes: {"type": "number", "description": "How often you want to auto-commit", "default": 10}
}).parseSync();

function autoCommit(): void {
    console.log('Committing files');
    const date: Date = new Date();
    const git: SimpleGit = simpleGit(argv.repo);
    git.add('.');
    git.commit(`${date.getFullYear}-${date.getMonth}-${date.getDate} ${date.getHours}:${date.getMinutes} Auto Commit`);
    git.push('origin');
}

setInterval(autoCommit, argv.minutes * 60 * 1000);