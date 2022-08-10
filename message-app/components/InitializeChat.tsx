import { Button, TextField } from "@material-ui/core"
import { Form, Formik } from "formik"
import React, { Dispatch, SetStateAction, useState } from "react"
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import * as yup from "yup";
import { useGlobalState } from "../GlobalStateContext";

interface InitializeChatProps {
    initUser: (username: string) => void

 }

export const InitializeChat: React.FC<InitializeChatProps> = (props: InitializeChatProps) => {
    
        const { state, setState } = useGlobalState();

    const schema = yup.object().shape({

        username: yup.string().required()
        
    })
    return (
        <Formik
        initialValues={{username: ''}}
        validationSchema={schema}
        onSubmit={values => {
            setState((prev) => ({...prev, username: values.username, loggedIn: true}))
            try{
                props.initUser(values.username)
            }catch(err){
                console.log("init err", err)
            }
                        
    }}
        >
            {props =>(
                <div style={{ textAlign: 'center', margin: '30vh auto', width: '70%' }}>
                <h1>Please enter your username</h1> 
                <Form>
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        value={props.values.username}
                        onChange={props.handleChange}
                        error={props.touched.username && Boolean(props.errors.username)}
                        helperText={props.touched.username && props.errors.username}
                      />
                      <div style={{marginTop: '5px'}}>
                      <Button
                    type="submit"
                    disabled={!props.isValid || !props.touched}
                  >
                    Enter Chat
                  </Button>
                  </div>
                </Form>
                </div>
                

            )}
            
        </Formik>
    )
}