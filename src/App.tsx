import React, { useState } from 'react';
import './App.css';
import { usePostQuery } from './useRequest';
import { getPosts } from './graphql';
import PostCard from './components/Card';
import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@mui/material';
import { IPost } from './types/Posts';

function App() {
  const { getPostList, loading, error } = usePostQuery(getPosts);
  const [postList, setPostList] = useState<IPost[]>()

  return (
    <div className="App">
      <AppBar position="static" color='transparent' style={{ padding: 20, display: 'flex' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h3" component="div" style={{ marginRight: 15 }}>My Blog</Typography>
            <Button style={styles.button} onClick={async () => {
              await getPostList().then((result) => {
                setPostList(result.data?.posts)
              })
            }}>
              Load Posts
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      {loading ? (
        <Typography variant="h3" component="div" style={{ marginTop: 20 }}>
          Loading...
        </Typography>
      ) : (
        <Grid container spacing={2} marginTop={10} style={{ padding: 20 }}>
          {postList?.map((post) => (
            <Grid key={post.id} item xs={6}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
      {error && (
        <Typography variant="h3" component="div">
          Something went wrong!
        </Typography>
      )}
    </div>
  );
}

export default App;

const styles = ({
  button: {
    backgroundColor: "#2b7873",
    color: "#fff"
  }
})
