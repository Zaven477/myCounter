import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppData } from "./App";
import { vi } from "vitest";

global.fetch = vi.fn();

const mockFetch = global.fetch as jest.Mock;

describe("My test", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  test("загрузка данных", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ Date: "2025-04-17T11:30:00+03:00" }),
    });

    render(<AppData />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("2025-04-17T11:30:00+03:00")).toBeInTheDocument();
    });
  });

  test('при клике на кнопку "Обновить" используются данные из кеша', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ Date: "2025-04-17T11:30:00+03:00" }),
    });

    render(<AppData />);

    await waitFor(() => {
      expect(screen.getByText("2025-04-17T11:30:00+03:00")).toBeInTheDocument();
    });

    const button = screen.getByText(/обновить/i);

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(screen.getByText("2025-04-17T11:30:00+03:00")).toBeInTheDocument();
  });
});
