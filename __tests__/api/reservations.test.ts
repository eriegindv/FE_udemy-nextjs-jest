/* eslint-disable no-param-reassign */
import { testApiHandler } from "next-test-api-route-handler";

import { validateToken } from "@/lib/auth/utils";
import reservationsPostHandler from "@/pages/api/reservations/[reservationId]";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

jest.mock("@/lib/auth/utils");
const mockValidateToken = validateToken as jest.Mock;

test("POST /api/reservations/[reservationId] creates a reservation", async () => {
  await testApiHandler({
    handler: reservationsPostHandler,
    paramsPatcher: (params) => {
      params.reservationId = 5;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ showId: 0, userId: 1, seatCount: 2 }),
      });

      expect(res.status).toBe(201);
    },
  });

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
      expect(json.userReservations).toHaveLength(3);
    },
  });
});

test("POST /api/reservations/[reservationId] return 401 status when not aurthorized", async () => {
  mockValidateToken.mockResolvedValue(false);

  await testApiHandler({
    handler: reservationsPostHandler,
    paramsPatcher: (params) => {
      params.reservationId = 5;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ showId: 0, userId: 1, seatCount: 2 }),
      });

      // expect unauthorized
      expect(res.status).toBe(401);
    },
  });
});
