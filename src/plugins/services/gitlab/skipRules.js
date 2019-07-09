export default {
  pipeline: {
    targetField: 'pipelineStatus',
    skippable: ['pending'],
  },

  note: {
    targetField: 'noteType',
    skippable: ['Commit', 'Issue', 'Snippet'],
  },

  mergeRequest: {
    targetField: 'mergeRequestAction',
    skippable: ['update'],
  },
};
