import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

describe("User reservations component shows correct button ", () => {
  test("when reservations > 0", async () => {
    render(<UserReservations userId={1} />);

    const purchaseButton = await screen.findByRole("button", {
      name: /purchase more tickets/i,
    });
    expect(purchaseButton).toBeInTheDocument();
  });

  test("when reservations = 0", async () => {
    render(<UserReservations userId={0} />);

    const purchaseButton = await screen.findByRole("button", {
      name: /purchase tickets/i,
    });
    expect(purchaseButton).toBeInTheDocument();

    const heading = screen.queryByRole("heading", { name: /your tickets/i });
    expect(heading).not.toBeInTheDocument();
  });
});
