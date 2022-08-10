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
      flexDirection: "column"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end"
    },
    messageStyle: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#A8DDFD",
      width: "60%",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #97C6E3",
      borderRadius: "10px",
    },

    messageContent: {
      padding: 0,
      margin: 1,
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      marginTop: "10px",
      bottom: "-3px",
      right: "5px"
    },

    displayName: {
      marginTop: "20px"
    }
  })
);