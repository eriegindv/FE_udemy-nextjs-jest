/* eslint-disable no-param-reassign */
import { testApiHandler } from "next-test-api-route-handler";

import { validateToken } from "@/lib/auth/utils";
import userAuthHandler from "@/pages/api/users/index";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

jest.mock("@/lib/auth/utils");
const mockValueToken = validateToken as jest.Mock;

test("POST /api/users receives token with correct credentials", async () => {
  await testApiHandler({
    handler: userAuthHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json", // Must use correct content type
        },
        body: JSON.stringify({ email: "test@test.test", password: "test" }),
      });

      expect(res.status).toBe(200);
      const json = await res.json();

      expect(json).toHaveProperty("user");
      expect(json.user.id).toEqual(1);
      expect(json.user.email).toEqual("test@test.test");
      expect(json.user).toHaveProperty("token");
    },
  });
});

test("GET /api/users/[userId]/reservations returns empty array for user without reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });

      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.userReservations).toHaveLength(2);
    },
  });
});

test("GET /api/users/[userId]/reservations returns correct number of reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = 2; // a userId with no reservations in the test DB
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });

      expect(res.status).toBe(200);

      const json = await res.json();
      // based on test database
      expect(json.userReservations).toHaveLength(0);
    },
  });
});

test("GET /api/users/[userId]/reservations returns 401 status when not authorized", async () => {
  mockValueToken.mockResolvedValue(false);

  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });

      expect(res.status).toBe(401);
    },
  });
});
