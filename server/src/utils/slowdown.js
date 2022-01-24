module.exports = () => {
  return new Promise((res) => {
    setTimeout(() => res(), 1000);
  });
};