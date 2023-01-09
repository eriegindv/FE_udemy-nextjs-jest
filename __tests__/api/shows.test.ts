import { expect } from "@jest/globals";
import { testApiHandler } from "next-test-api-route-handler";

import showIdHandler from "@/pages/api/shows/[showId]";
// Import the handler under test from the pages/api directory
import showsHandler from "@/pages/api/shows/index";

import { readFakeData } from "../__mocks__/fakeData";

it("GET /api/shows returns shows from database", async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      const { fakeShows } = await readFakeData();

      expect(json).toEqual({ shows: fakeShows });
    },
  });
});

it("GET /api/shows/[showId] returns the data for the correct show ID", async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.showId = 0;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      const { fakeShows } = await readFakeData();

      expect(json).toEqual({ show: fakeShows[0] });
    },
  });
});
