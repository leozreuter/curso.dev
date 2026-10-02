function can(user, feature) {
  return user.features.includes(feature);
}

const authorization = {
  can,
};

export default authorization;
