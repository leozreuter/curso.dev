import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getRounds();
  return await bcryptjs.hash(password, rounds);
}

function getRounds() {
  return process.env.NODE_ENV == "production" ? 14 : 1;
}

async function compare(inputPassword, storedPassword) {
  return await bcryptjs.compare(inputPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
