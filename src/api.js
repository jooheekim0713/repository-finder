import { Octokit } from '@octokit/core';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const searchKey = 'name';
const searchRange = 'public';
const perPage = 10;

const issue = 'issue';
const issueOpen = 'open';
const issueSort = 'created-desc';

const octokit = new Octokit({
  auth: ACCESS_TOKEN,
});

export async function fetchRepos(value = ' ', pageNum = 1) {
  const response = await octokit.request(
    `GET /search/repositories?q=${value}+in%3A${searchKey}+is%3A${searchRange}&page=${pageNum}&per_page=${perPage}`
  );
  return response;
}
export async function fetchIssues(owner, name, pageNum = 1) {
  const response = await octokit.request(
    `GET /repos/${owner}/${name}/issues?q=is%3A${issue}+is%3A${issueOpen}+sort%3A${issueSort}&page=${pageNum}&per_page=${perPage}`
  );
  return response;
}
