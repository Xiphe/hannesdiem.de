import { Octokit } from '@octokit/rest';
import { getRequiredServerEnvVar } from './misc';

declare global {
  // This preserves the LRU cache during development
  // eslint-disable-next-line
  var octokit: Octokit | undefined;
}

if (!global.octokit) {
  global.octokit = new Octokit({
    auth: getRequiredServerEnvVar('GH_TOKEN'),
  });
}

export default global.octokit!;
