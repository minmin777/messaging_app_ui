import { makeStyles, createStyles } from "@material-ui/styles";
import React from "react";
import { useStylesMessage } from "../styles/styles";
import SnackbarContent from '@mui/material/SnackbarContent';


interface MessageProps {
    position: string;
    displayName: string;
    message: string;
}
export const Message: React.FC<MessageProps> = (props: MessageProps) => {

    const styles = useStylesMessage();
    return (
        <div className={props.position === "right" ? styles.messageRowRight : styles.messageRow}> 
            {props.position === "left" && 
            <div className={styles.displayName}>{props?.displayName}</div>}
            <div style={{margin: "10px"}}>
            <SnackbarContent message={props?.message} style={{backgroundColor: "#A8DDFD", color: "black"}}/>
            </div>
        </div>


    )

}