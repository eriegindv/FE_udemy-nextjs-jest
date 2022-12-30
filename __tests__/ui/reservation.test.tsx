import { render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

describe("reservation page shows ", () => {
  test("correct number of available seats", async () => {
    render(<Reservation showId={0} submitPurchase={jest.fn()} />);

    const seatCountText = await screen.findByText(/10 seats left/i);
    expect(seatCountText).toBeInTheDocument();
  });

  test("'sold out' message and NO purchase button if threre are no seats available", async () => {
    render(<Reservation showId={1} submitPurchase={jest.fn()} />);

    const soldOutMessage = await screen.findByRole("heading", {
      name: /sold out/i,
    });
    expect(soldOutMessage).toBeInTheDocument();

    // use 'query' instead of 'get' because we expect not to be threre
    const purchaseButton = screen.queryByRole("button", { name: /purchase/i });
    expect(purchaseButton).not.toBeInTheDocument();
  });
});
