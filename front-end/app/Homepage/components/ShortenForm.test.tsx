import { act, fireEvent, render, screen } from "@testing-library/react";
import ShortenForm from "./ShortenForm";

describe("ShortenForm", () => {
  it("renders input and button accessibly", () => {
    render(
      <ShortenForm
        onSubmit={vi.fn().mockResolvedValue(undefined)}
        loading={false}
        error={null}
        success={null}
      />
    );

    expect(screen.getByLabelText(/URL to shorten/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /shorten url/i })
    ).toBeInTheDocument();
  });

  it("submits typed URL", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <ShortenForm
        onSubmit={onSubmit}
        loading={false}
        error={null}
        success={null}
      />
    );

    fireEvent.change(screen.getByLabelText(/URL to shorten/i), {
      target: { value: "https://example.com" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /shorten url/i }));
    });

    expect(onSubmit).toHaveBeenCalledWith("https://example.com");
  });
});
