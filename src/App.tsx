import React from 'react';
import './App.css';
import {Box, Button, FormGroup, Grid, Paper, TextField} from "@mui/material";
import {Message} from "./components/Message";
import {MessageType} from "./types";

function App() {
  const messageList: MessageType[] = [
    {
      message: 'Hi',
      type: 'sender',
    },
    {
      message: 'How are you ?',
      type: 'receiver',
    },
    {
      message: 'I\'m fine thank you.',
      type: 'sender',
    },
  ]
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Paper sx={{borderRadius: '1rem', height: '80vh', padding: '2rem', marginTop: '5vh'}}>
          <Box sx={{height: '90%'}}>
            <Grid container>
              {
                messageList.map(
                  ({type, message}) => (<Message type={type} message={message}/>
                  )
                )}
            </Grid>
          </Box>
          <Box sx={{height: '10%'}}>
            <FormGroup>
              <TextField variant={"standard"} label={'Send Message'} sx={{marginBottom: '0.6rem'}}/>

              <Button variant={"contained"}>Send Message</Button>
            </FormGroup>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
