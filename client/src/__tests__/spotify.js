import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";

it('user can click login button', () => {
  const { getByRole } = render(<Login />)

  userEvent.click(getByRole("link"))
})