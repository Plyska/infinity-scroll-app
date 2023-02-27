import React from 'react'
import { useAppSelector } from '../../hooks/redux';
import Box from '@mui/material/Box';
import { styles } from './styles';
import PostCard from '../PostCard';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const PostsList: React.FC = () => {
    const { posts, isLoading, error } = useAppSelector((state) => state.postReduser);

    return (
        <Box sx={styles.container}>
            {
                !error && isLoading ? <CircularProgress size={100} sx={styles.loader} /> : (
                    <Box sx={styles.postsList}>
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </Box>
                )
            }
            {
                error && (
                    <>
                        <Typography variant='h2' color='error'>Something Went Wrong</Typography>
                        <Typography variant='h3' color='error'>{error}</Typography>
                    </>
                )
            }
        </Box>
    )
}

export default PostsList