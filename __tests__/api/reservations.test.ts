/* eslint-disable no-param-reassign */
import { expect } from "@jest/globals";
import { testApiHandler } from "next-test-api-route-handler";

import reservationsPostHandler from "@/pages/api/reservations/[reservationId]";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

jest.mock("@/lib/auth/utils");

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
