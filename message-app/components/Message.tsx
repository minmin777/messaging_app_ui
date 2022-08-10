import { makeStyles, createStyles } from "@material-ui/styles";
import { useStylesMessage } from "../styles/styles";



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
            <div className={styles.messageStyle}>
            <div>
              <p className={styles.messageContent}>{props?.message}</p>
            </div>

            </div>
        </div>


    )

}