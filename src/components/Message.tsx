import {Grid, Paper} from "@mui/material";

type MessageProps = {
  type: 'sender' | 'receiver'
  message: string
}
export const Message = ({type = 'sender', message}: MessageProps) => {
  const isSender = type == 'sender'
  return (
    <>
      {!isSender || <Grid xs={4}/>}
      <Grid item justifySelf={'center'} xs={8}>
        <Paper sx={{
          backgroundColor: isSender ? 'secondary.dark' : 'primary.main',
          borderRadius: '1rem',
          color:'white',
          paddingX: '2rem',
          paddingY: '4rem',
          marginX: '1rem',
          marginY: '0.5rem'
        }}>
          {message}
        </Paper>
      </Grid>
      {isSender || <Grid xs={4}/>}
    </>
  )
}
