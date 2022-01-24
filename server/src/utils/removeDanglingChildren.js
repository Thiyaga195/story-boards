module.exports = (service, queryField) => (context) => {
  context.app.services[service].remove(null, {
    query: { [queryField]: {
      $in: context.result.length ? context.result.map(item => item._id) : [context.result._id]
    } },
  });
  
};