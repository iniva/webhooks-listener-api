export default {
  type: 'onPreResponse',
  method: (request, h) => {
    // Your custom pre-response logic

    return h.continue;
  },
};
