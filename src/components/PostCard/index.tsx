import React from 'react'
import Typography from '@mui/material/Typography';
import { Post } from '../../types/Post';
import { styles } from "./styles";
import MenuItem from '@mui/material/MenuItem';
import { useAppContext } from '../../context/AppContext';

interface PostProps {
    post: Post
}

const PostCard: React.FC<PostProps> = ({ post }) => {
    const { changeAppParameters } = useAppContext();

    const handleCardClick = () => {
        changeAppParameters({
            params: {
                post
            },
            isOpenModal: true
        })
    }

    return (
        <MenuItem onClick={handleCardClick} sx={styles.card}>
            <Typography variant='h4' sx={styles.title}>{post.id}.</Typography>
            <Typography variant='h4' sx={styles.title}>{post.name}</Typography>
        </MenuItem>
    )
}

export default PostCard