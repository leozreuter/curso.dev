import { InternalServerError } from "infra/errors.js";

const availableFeatures = [
  // Users
  "read:user",
  "read:user:self",
  "update:user",
  "update:user:others",
  "create:user",
  // Sessions
  "read:session",
  "create:session",
  // Actvation token
  "read:activation_token",
  // Status
  "read:status",
  "read:status:all",
  // Migrations
  "read:migration",
  "create:migration",
];

function can(user, feature, resource) {
  validateUser(user);
  validateFeature(feature);

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
  validateUser(user);
  validateFeature(feature);
  validateResource(resource);

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
    if (can(user, "read:status:all")) {
      output.dependecies.database.version = db.version;
    }
  }

  if (feature === "read:migration") {
    output = resource.map((migration) => {
      return {
        path: migration.path,
        name: migration.name,
        timestamp: migration.timestamp,
      };
    });
  }

  delete output.password;
  return output;
}

function validateUser(user) {
  if (!user || !user.features) {
    throw new InternalServerError({
      cause: "É necessário fornecer `user` no model `authorization`.",
    });
  }
}
function validateFeature(feature) {
  if (!feature || !availableFeatures.includes(feature)) {
    throw new InternalServerError({
      cause:
        "É necessário fornecer um `feature` conhecida no model `authorization`.",
    });
  }
}

function validateResource(resource) {
  if (!resource) {
    throw new InternalServerError({
      cause: "É necessário fornecer um `resource` no model `authorization`.",
    });
  }
}

const authorization = {
  can,
  filterOutput,
};

export default authorization;
