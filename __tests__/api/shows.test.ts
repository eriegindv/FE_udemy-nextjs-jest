import { expect } from "@jest/globals";
import { testApiHandler } from "next-test-api-route-handler";

// Import the handler under test from the pages/api directory
import handler from "@/pages/api/shows/index";

import { readFakeData } from "../__mocks__/fakeData";

it("/api/shows returns shows from database", async () => {
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      const { fakeShows } = await readFakeData();

      expect(json).toEqual({ shows: fakeShows });
    },
  });
});
