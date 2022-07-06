import React, { useState } from 'react';
import './App.css';
import { usePostQuery, useFilterQuery } from './useRequest';
import { getPosts, getFilteredPost } from './graphql';
import PostCard from './components/Card';
import { AppBar, Button, Container, Grid, TextField, Toolbar, Typography } from '@mui/material';
import { IPost } from './types/Posts';

function App() {
  const [searchValue, setSearchValue] = useState<string>()
  const [isSearching, setIsSearching] = useState(false)
  const { getPostList, loading, error } = usePostQuery(getPosts);
  const { getFilteredPostList } = useFilterQuery(getFilteredPost, searchValue);
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
      <div style={{ display: 'flex', marginLeft: 20, marginTop: 30 }}>
        <TextField
          id="standard-basic"
          label="Search Blog Post"
          variant="standard"
          style={{ width: '30%', marginRight: 20, }}
          onChange={(search) => setSearchValue(search.target.value)}
        />
        <Button variant="outlined" onClick={async () => {
          await getFilteredPostList({ variables: { title: searchValue } }).then((result) => {
            setIsSearching(true)
            setPostList(result.data?.post)
          })
        }}>
          Search
        </Button>
      </div>
      {loading ? (
        <Typography variant="h3" component="div" style={{ marginTop: 20 }}>
          Loading...
        </Typography>
      ) : (
        (postList?.length == 0 && isSearching) ? (
          <Typography variant="h3" component="div">
            The search returned no results!
          </Typography>
        ) : (
          <Grid container spacing={2} marginTop={10} style={{ padding: 20 }}>
            {postList?.map((post) => (
              <Grid key={post.id} item xs={6}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        )
      )
      }
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
