const fs = require('fs');
const { promisify } = require('util');

const { getBranchName, getConventionalCommitFragment } = require('./helpers');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 * @function transformMessage
 * @description Adds details to commit message
 *
 * @param {String} message
 */
const transformMessage = async (message) => {
  const lines = message.split('\n');
  let firstLine = lines.shift();
  const commitType = await getConventionalCommitFragment(firstLine);
  const branchName = await getBranchName();

  // Remove commit type
  firstLine = firstLine.replace(commitType, '');

  // Add branch name
  if (!firstLine.includes(`[${branchName}]`)) {
    firstLine = `[${branchName}] ${firstLine}`;
  }

  // Add commit type at the beginning
  firstLine = `${commitType} ${firstLine}`;

  lines.unshift(firstLine);

  return lines.join('\n');
};

const parseFile = async (filePath) => {
  try {
    const data = await readFile(filePath);
    const message = await transformMessage(data.toString());

    await writeFile(filePath, message);
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

module.exports = parseFile;
