import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Lists extends BaseModel {
  // eslint-disable-next-line
  constructor(data, options) {
    super(data, options);
  }

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Lists'

  // Define default properties here
  static instanceDefaults() {
    return {
      name: '',
      order: '',
      boardId: '',
      archived: false,
    };
  }
}
const servicePath = 'lists';
const servicePlugin = makeServicePlugin({
  Model: Lists,
  service: feathersClient.service(servicePath),
  servicePath,
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

export default servicePlugin;
