import { defineConfig } from "cypress";

import { addBand } from "./lib/features/bands/queries";
import { resetDB } from "./__tests__/__mocks__/db/utils/reset-db";

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("task", {
        "db:reset": () => resetDB().then(() => null),
        addBand: (newBand) => addBand(newBand).then(() => null),
      });
    },
  },
});
