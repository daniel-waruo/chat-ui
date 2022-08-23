import {Grid, Paper} from "@mui/material";

type MessageProps = {
  sender: string
  message: string
  isSender: boolean
}
export const Message = ({sender, message, isSender}: MessageProps) => {
  return (
    <>
      {!isSender || <Grid xs={4}/>}
      <Grid item justifySelf={'center'} xs={8}>
        <Paper sx={{
          backgroundColor: isSender ? 'secondary.dark' : 'primary.main',
          borderRadius: '1rem',
          color: 'white',
          paddingX: '2rem',
          paddingY: '2rem',
          marginX: '1rem',
          marginY: '0.5rem'
        }}>
          {message}
          <div style={{textAlign: 'right', marginTop: '1rem'}}>
            <strong>Sent By : {sender}</strong>
          </div>
        </Paper>
      </Grid>
      {isSender || <Grid xs={4}/>}
    </>
  )
}
