import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

// Mock useSearchParams (no piece pre-fill by default).
const searchParams = new URLSearchParams();
vi.mock("next/navigation", () => ({
  useSearchParams: () => searchParams,
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Name/i), "Layla Hassan");
  await user.type(screen.getByLabelText(/Email/i), "layla@example.com");
  await user.type(
    screen.getByLabelText(/Message/i),
    "I would like to know the lead time for the Aria sofa.",
  );
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows validation errors and does not submit when fields are empty", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /Send Inquiry/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects an invalid email without calling the API", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/i), "Omar");
    await user.type(screen.getByLabelText(/Email/i), "bad-email");
    await user.type(
      screen.getByLabelText(/Message/i),
      "A perfectly long enough message here.",
    );
    await user.click(screen.getByRole("button", { name: /Send Inquiry/i }));

    expect(
      await screen.findByText(/valid email address/i),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("submits valid data and shows a success message", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /Send Inquiry/i }));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        "/api/inquiry",
        expect.objectContaining({ method: "POST" }),
      );
    });
    expect(
      await screen.findByText(/your message is on its way/i),
    ).toBeInTheDocument();
  });

  it("renders a honeypot field that is hidden from users", () => {
    render(<ContactForm />);
    const honeypot = document.querySelector('input[name="company"]');
    expect(honeypot).not.toBeNull();
    // It is wrapped in an aria-hidden, off-screen container.
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it("surfaces a field error returned by the server (422)", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({ fieldErrors: { email: "Server says invalid." } }),
    });
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /Send Inquiry/i }));

    expect(await screen.findByText("Server says invalid.")).toBeInTheDocument();
  });
});
