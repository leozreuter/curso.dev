import { InternalServerError } from "infra/errors.js";
import authorization from "models/authorization.js";
import orchestrator from "tests/orchestrator.js";

describe("models/authorization.js", () => {
  describe(".can()", () => {
    test("Without `user`", () => {
      expect(() => {
        authorization.can();
      }).toThrow(InternalServerError);
    });

    test("Without `user.features`", () => {
      const createdUser = orchestrator.createUser();
      expect(() => {
        authorization.can(createdUser);
      }).toThrow(InternalServerError);
    });

    test("With `unknown feature`", () => {
      let createdUser = orchestrator.createUser();
      createdUser.features = [];
      expect(() => {
        authorization.can(createdUser, "unknown:feature");
      }).toThrow(InternalServerError);
    });

    test("With `valid user` and `known feature`", () => {
      let createdUser = orchestrator.createUser();
      createdUser.features = ["read:user"];
      expect(authorization.can(createdUser, "read:user")).toBe(true);
    });
  });

  describe(".filterOutput()", () => {
    test("Without `user`", () => {
      expect(() => {
        authorization.filterOutput();
      }).toThrow(InternalServerError);
    });

    test("Without `user.features`", () => {
      const createdUser = orchestrator.createUser();
      expect(() => {
        authorization.filterOutput(createdUser);
      }).toThrow(InternalServerError);
    });

    test("With `unknown feature`", () => {
      let createdUser = orchestrator.createUser();
      createdUser.features = [];
      expect(() => {
        authorization.filterOutput(createdUser, "unknown:feature");
      }).toThrow(InternalServerError);
    });

    test("With `valid user`, `known feature` but `no resouce`", () => {
      let createdUser = orchestrator.createUser();
      createdUser.features = ["read:user"];
      expect(() => {
        authorization.filterOutput(createdUser, "read:user");
      }).toThrow(InternalServerError);
    });

    test("With `valid user`, `known feature` and `resouce`", () => {
      let createdUser = orchestrator.createUser();
      createdUser.features = ["read:user"];
      const resource = {
        id: 1,
        username: "resource",
        features: [],
        password: "passwd",
        email: "email@email.com",
        created_at: "2026-0101T00:00:00.000Z",
        updated_at: "2026-0101T00:00:00.000Z",
      };
      expect(
        authorization.filterOutput(createdUser, "read:user", resource),
      ).toEqual({
        id: 1,
        username: "resource",
        features: [],
        created_at: "2026-0101T00:00:00.000Z",
        updated_at: "2026-0101T00:00:00.000Z",
      });
    });
  });
});
