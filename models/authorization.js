function can(user, feature, resource) {
  let authorized = false;

  authorized = user.features.includes(feature);

  if (feature === "update:user" && resource) {
    const isOwner = user.id === resource.id;
    const isPrivilege = can(user, "update:user:others");
    authorized = isOwner || isPrivilege;
  }

  return authorized;
}

const authorization = {
  can,
};

export default authorization;
