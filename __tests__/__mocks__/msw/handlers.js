import { rest } from "msw";

import { readFakeData } from "../fakeData";
import { fakeUserReservations } from "../fakeData/userReservations";

export const handlers = [
  rest.get("http://localhost:3000/api/shows/:showId", async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;

    // index / showId = 0 has seats available in fake data
    // index / showId = 1 has NO seats available
    return res(ctx.json({ show: fakeShows[Number(showId)] }));
  }),
  rest.get(
    "http://localhost:3000/api/users/:userId/reservations",
    async (req, res, ctx) => {
      const { userId } = req.params;

      const userReservations = userId === "0" ? [] : fakeUserReservations;
      return res(ctx.json({ userReservations }));
    }
  ),
];
