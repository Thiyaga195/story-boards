const { setField } = require('feathers-authentication-hooks');

module.exports = {
  setOwnerField: setField({
    from: 'params.user._id',
    as: 'data.ownerId'
  }),
  restrictToOwner: setField({
    from: 'params.user._id',
    as: 'params.query.ownerId'
  }),

};