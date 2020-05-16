module.exports = (entity, body) => {
  const { id, ...rest } = entity;

  return (
    Object.keys(rest).length === Object.keys(body).length &&
    Object.keys(rest).filter((it) => {
      return !Object.keys(body).includes(it);
    }).length === 0
  );
};
