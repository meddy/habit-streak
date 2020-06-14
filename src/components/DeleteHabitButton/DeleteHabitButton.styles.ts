import { Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

export const StyledButton = styled(Button)(({ theme }) => ({
  height: "100%",
  marginBottom: 0,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
