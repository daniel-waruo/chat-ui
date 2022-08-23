import React, {useState} from 'react';
import './App.css';
import {Box, Button, FormGroup, Grid, Paper, TextField} from "@mui/material";
import {Message} from "./components/Message";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {selectMessages, sendMessage} from "./feature/chat/chatSlice";

function App() {
  const [message, setMessage] = useState('');
  const messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();
  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    dispatch(sendMessage({
      type: 'sender',
      message: message
    }))
    setMessage('')
  }
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Paper sx={{borderRadius: '1rem', height: '80vh', padding: '2rem', marginTop: '5vh'}}>
          <Box sx={{height: '90%'}}>
            <Grid container>
              {
                messages.map(
                  ({type, message}) => (<Message type={type} message={message}/>
                  )
                )}
            </Grid>
          </Box>
          <Box sx={{height: '10%'}}>
            <form onSubmit={onSubmitHandler}>
              <FormGroup>
                <TextField value={message} variant={"standard"} label={'Send Message'} sx={{marginBottom: '0.6rem'}}
                           onChange={e => setMessage(e.target.value)}/>
                <Button
                  type={"submit"}
                  disabled={!message}
                  variant={"contained"}>Send Message</Button>
              </FormGroup>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
