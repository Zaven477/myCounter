import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "./App";

describe("Counter", () => {
  test("Рендерит начальное значение 0", () => {
    render(<Counter />); // Рендерим компонент
    expect(screen.getByText(/Счётчик: 0/i)).toBeInTheDocument(); // Проверяем, что на странице есть текст "Счётчик: 0"
  });

  test("Увеличивает счётчик при нажатии", () => {
    render(<Counter />); // Рендерим компонент
    const button = screen.getByText(/увеличить/i); // Получаем кнопку по тексту
    fireEvent.click(button); // Нажимаем на кнопку
    expect(screen.getByText(/Счётчик: 1/i)).toBeInTheDocument(); // Проверяем, что на странице есть текст "Счётчик: 1"
  });
});
