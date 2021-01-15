import { makeStyles } from "@material-ui/core/styles";

// material make styles
export const mainStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  listWrapper: {
    borderLeft: "4px solid #FF5722",
    margin: `${theme.spacing(2)}px 0px`,
  },
  list: {
    backgroundColor: "#fff",
    boxShadow: "rgb(0 26 102 / 40%) 0px 5px 20px -12px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "#fbfbfb",
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(3)}px auto`,
    padding: theme.spacing(2),
    boxShadow: "rgb(0 26 102 / 40%) 0px 5px 20px -12px",
    position: "relative",
  },
  circleButton: {
    position: "absolute",
    zIndex: 1,
    bottom: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  inputOfAddNewTask: {
    border: "none",
    width: "100%",
    height: "40px",
  },
  editButton:{
    backgroundColor:'#FF5722',
    color:'#fff',
    borderRadius:'50%',
    width:'21px',
    height:'21px',
    padding:'5px'
  }
}));
