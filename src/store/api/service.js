import { API, withToken } from './common';

export default {
  fetchServices: token => withToken(token, API.get, 'services'),
  fetchServiceIssues: (token, serviceId) =>
    withToken(token, API.get, `service-issues?filters[service_id]=${serviceId}`),
  fetchServiceIssueDetails: (token, { parentId, serviceIssueId }) => {
    if ((parentId || parentId === 0) && (serviceIssueId || serviceIssueId === 0)) {
      return withToken(
        token,
        API.get,
        `/service-issue-details?filters[parent_id]=${parentId}&filters[service_issue_id]=${serviceIssueId}`
      );
    }

    if (parentId || parentId === 0) {
      return withToken(token, API.get, `/service-issue-details?filters[parent_id]=${parentId}`);
    }

    if (serviceIssueId) {
      return withToken(
        token,
        API.get,
        `/service-issue-details?filters[service_issue_id]=${serviceIssueId}`
      );
    }
  },
  fetchServiceIssueDetailById: (token, serviceIssueDetailId) =>
    withToken(token, API.get, `/service-issue-details/${serviceIssueDetailId}`),
  fetchServiceGuide: (token, serviceId) =>
    withToken(token, API.get, `/guides?filters[service_id]=${serviceId}`),
  createRating: (token, serviceIssueDetailId) => {
    withToken(token, API.post, '/ratings', {
      post_id: serviceIssueDetailId
    });
  },
  like: (token, serviceIssueDetailId) =>
    withToken(token, API.patch, '/ratings', {
      post_id: serviceIssueDetailId,
      type: 1
    }),
  dislike: (token, serviceIssueDetailId) =>
    withToken(token, API.patch, '/ratings', {
      post_id: serviceIssueDetailId,
      type: 2
    }),
  check: (token, postId) => withToken(token, API.get, `/ratings/me/${postId}`)
};
