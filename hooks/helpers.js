const { spawn } = require('child_process');

/**
 * @function asynCmd
 * @description Synchronous Command Line
 *
 * @param {String} command
 * @param {Array} options
 *
 * @returns {Promise}
 */
const asyncCmd = async (command, options = []) => new Promise((resolve, reject) => {
    const process = spawn(command, options);
    const result = {};

    process.stdout.on('data', data => {
        result.data = data.toString();
    });

    process.stderr.on('data', data => reject(data.toString()));

    process.on('close', code => {
        result.message = `${command} exited with code ${code}`;
        result.code = code;

        return resolve(result);
    });
});

/**
 * @function getBranchName
 * @description Returns the current branch name
 *
 * @returns {String}
 */
const getBranchName = async () => {
    const branchName = await asyncCmd('git', ['rev-parse', '--abbrev-ref', 'HEAD']);

    return branchName.data.trim();
};

/**
 * @function getConventionalCommitFragment
 * @description Finds and returns the fragment (if present) that has the conventional info
 *
 * @param {String} line
 *
 * @returns {(String|null)}
 */
const getConventionalCommitFragment = (line) => {
    const pattern = new RegExp(/([a-z]+:|[a-z]+\(.*\):)\s+/, 'g')
    const match = line.match(pattern);

    return match[0].trim() || null;
}

module.exports = {
    asyncCmd,
    getBranchName,
    getConventionalCommitFragment
}