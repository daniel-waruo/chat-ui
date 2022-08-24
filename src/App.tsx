import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Box, Button, FormGroup, Grid, Paper, TextField} from "@mui/material";
import {Message} from "./components/Message";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {selectMessages, sendMessage, setMessages} from "./feature/chat/chatSlice";

const fetchMessages = () => {
  /**
   * Function to fetch Messages from Local Storage
   */
  let messages = [];
  if (window.localStorage.getItem('messages')) {
    messages = JSON.parse(window.localStorage.getItem('messages') as string)
  }

  return messages
}

function App() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  const bottomRef = useRef(null);

  const [intervalID, setIntervalID] = useState<Number>()

  useEffect(
    () => {
      /**
       * Fetch Messages from LocalStorage and add them to state every half a second
       */
      if (!intervalID) {
        const id = setInterval(
          () => {
            let messages = fetchMessages()
            dispatch(setMessages(messages))
          },
          500
        )
        setIntervalID(id[Symbol.toPrimitive])
      }
    }
    , [intervalID])
  let messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();

  const onNameSubmitHandler = (e: any) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const onMessageSubmitHandler = (e: any) => {
    e.preventDefault()
    dispatch(sendMessage({
      timestamp: Date.now(),
      sender: name,
      message: message
    }))
    setMessage('')
  }

  useEffect(() => {
    // scroll in into view anytime messages are added
    const current:any =  bottomRef.current
    current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        {/*Show Name form if the Name is not yet saved into the state */}
        {!(name && isSubmitted) ?
          <>
            <form onSubmit={onNameSubmitHandler}>
              <FormGroup sx={{margin: '2rem'}}>
                <TextField value={name}
                           variant={"standard"}
                           label={'Enter your Name'}
                           sx={{marginBottom: '0.6rem'}}
                           onChange={e => setName(e.target.value)}/>
                <Button
                  type={"submit"}
                  variant={"contained"}>Submit</Button>
              </FormGroup>
            </form>
          </>
          :
          <>
            <Paper sx={{borderRadius: '1rem', height: '80vh', padding: '2rem', marginTop: '5vh'}}>
              <Box sx={{height: '80%', overflowY: 'auto'}}>
                  {
                    messages.map(
                      ({sender, message}) => (<Message isSender={sender === name} sender={sender} message={message}/>
                      )
                    )}
                  <div ref={bottomRef}/>
              </Box>
              <Box sx={{height: '10%'}}>
                <form onSubmit={onMessageSubmitHandler}>
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
          </>
        }
      </Grid>
    </Grid>
  );
}

export default App;
