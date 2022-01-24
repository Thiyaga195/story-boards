import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Activities extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Activities'

  // Define default properties here
  static instanceDefaults() {
    return {
      activityName: '',
    };
  }

  static setupInstance(data, { models }) {
    if (data.tasks?.data) {
      console.log('task =', data.tasks);
      data.tasks.data.forEach((task) => new models.api.Task(task));
      delete data.tasks;
    }
    return data;
  }

  get tasks() {
    return this.constructor.store.getters['tasks/find']({ query: { activityId: this.id } }).data;
  }
}
const servicePath = 'activities';
const servicePlugin = makeServicePlugin({
  Model: Activities,
  service: feathersClient.service(servicePath),
  servicePath,
});

export default servicePlugin;
