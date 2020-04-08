const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);

const { TARGET_BRANCH, LATEST_PR_SHA, PR_BRANCH } = process.env;

async function rebasePR() {
  const { stdout: latestShaOfTargetBranch } = await exec(
    `git rev-parse origin/${TARGET_BRANCH}`
  );
  try {
    const { stdout: commonAncestorSha } = await exec(
      `git merge-base origin/${TARGET_BRANCH} ${PR_BRANCH}`
    );
  } catch (e) {
    throw Error(e);
  }

  console.log(`--------------------------------`);
  console.log(` Target Branch:                   ${TARGET_BRANCH}`);
  console.log(` Latest Commit for Target Branch: ${latestShaOfTargetBranch}`);
  console.log(` Latest Commit for PR:            ${LATEST_PR_SHA}`);
  console.log(` First Common Ancestor SHA:       ${commonAncestorSha}`);
  console.log(`--------------------------------`);

  // const { stdout: commitCount } = await exec(
  //   `git rev-list --count origin/${TARGET_BRANCH}...${commonAncestorSha}`
  // );
  // console.log(
  //   `Checking ${commitCount.trim()} commits for changes in the Github Actions config file.`
  // );

  // const { stdout: githubActionsConfigChanged } = await exec(
  //   `git diff --name-only origin/${TARGET_BRANCH} ${commonAncestorSha} -- .github/workflows/commit-to-master.yml`
  // );

  // if (!!githubActionsConfigChanged) {
  //   throw Error(`
  //       CircleCI config on ${TARGET_BRANCH} has been modified since commit ${commonAncestorSha.slice(
  //     0,
  //     7
  //   )},
  //       which this PR is based on.
  //       Please rebase the PR on ${TARGET_BRANCH} after fetching from upstream.
  //       Rebase instructions for PR Author, please run the following commands:
  //         git fetch upstream ${TARGET_BRANCH};
  //         git checkout ${PR_BRANCH};
  //         git rebase upstream/${TARGET_BRANCH};
  //         git push --force-with-lease;
  //       `);
  // } else {
  //   console.log(
  //     'No change found in the Github Actions config file, continuing.'
  //   );
  // }

  // console.log(`Rebasing current branch on ${TARGET_BRANCH}.`);
  // await exec(`git rebase origin/${TARGET_BRANCH}`);
  // console.log('Rebase successful.');
}

rebasePR();
