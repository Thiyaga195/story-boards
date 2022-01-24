const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');

const { restrictToOwner, setOwnerField, slowdown, removeDanglingChildren } = require('../../utils/');

const activityResolver = {
  joins: {
    activities: () => async (board, context) => {
      const { method,
        params: {
          $eager
        } } = context;
      if (method === 'get' || $eager) {
        board.activity = (await context.app.services['activities'].find({
          query: { boardId: board._id },
          $eager: true,
        }));
      }
    },
  }
};

const ownerResolver = {
  joins: {
    owner: () => async (board, context) => {
      board.owner = (await context.app.services['users'].get(board.ownerId, {
        query: { $select: ['name', 'email'] }
      }));
      return board;
    }
  }
};
const query = {
  owner: true,
  activities: true,
};
module.exports = {
  before: {
    all: [authenticate('jwt'), slowdown],
    find: [
      restrictToOwner
    ],
    get: [
      restrictToOwner
    ],
    create: [
      setOwnerField
    ],
    update: [
      setOwnerField,
      restrictToOwner
    ],
    patch: [
      setOwnerField,
      restrictToOwner
    ],
    remove: [

    ]
  },

  after: {
    all: [fastJoin(ownerResolver, query)],
    find: [],
    get: [fastJoin(activityResolver, query)],
    create: [],
    update: [],
    patch: [],
    remove: [removeDanglingChildren('activities', 'boardId')]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
