import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStylesChat = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    paper: {
      width: "100vw",
      height: "100vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  })
);

export const useStylesMessage = makeStyles(() =>
  createStyles({
    messageRow: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end"
    },
    displayName: {
      marginTop: "20px"
    }
  })
);