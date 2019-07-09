export default {
  type: 'onPreHandler',
  method: (request, h) => {
    // Your custom pre-handler logic

    return h.continue;
  },
};
