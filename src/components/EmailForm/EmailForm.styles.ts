import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

export const StyledForm = styled("form")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)({
  width: "100%",
});
