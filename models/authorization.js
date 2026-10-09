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

function filterOutput(user, feature, resource) {
  let output = {};
  const isOwner =
    user.id === resource.id ||
    (resource.user_id != null && user.id === resource.user_id);

  if (feature === "read:user") {
    output = {
      id: resource.id,
      username: resource.username,
      features: resource.features,
      created_at: resource.created_at,
      updated_at: resource.updated_at,
    };
    if (isOwner) {
      output.email = resource.email;
    }
  }

  if (feature === "read:session" && isOwner) {
    output = {
      id: resource.id,
      token: resource.token,
      user_id: resource.user_id,
      expires_at: resource.expires_at,
      created_at: resource.created_at,
      updated_at: resource.updated_at,
    };
  }

  if (feature === "read:activation_token") {
    output = {
      id: resource.id,
      used_at: resource.used_at,
      user_id: resource.user_id,
      expires_at: resource.expires_at,
      created_at: resource.created_at,
      updated_at: resource.updated_at,
    };
  }

  if (feature === "read:status") {
    const db = resource.dependecies.database;
    output = {
      updated_at: resource.updated_at,
      dependecies: {
        database: {
          max_connections: db.max_connections,
          opend_connections: db.opend_connections,
        },
      },
    };
    if (user.features.includes("read:status:privilege")) {
      output.dependecies.database.version = db.version;
    }
  }

  delete output.password;
  return output;
}

const authorization = {
  can,
  filterOutput,
};

export default authorization;
