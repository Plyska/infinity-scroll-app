import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppContext } from '../../context/AppContext';
import { styles } from "./styles";

export default function ModalDetails() {
    const { appParameters, changeAppParameters } = useAppContext();
    const { isOpenModal = false } = appParameters;
    const { post } = appParameters.params;

    const handleClose = () => {
        changeAppParameters({
            isOpenModal: false
        })
    }

    return (
        <>
            {
                post && (
                    <Modal
                        open={isOpenModal}
                        onClose={handleClose}
                    >
                        <Box sx={styles.container}>
                            <Box sx={styles.row}>
                                <Typography sx={styles.title} variant="h6" component="h2">
                                    Id:&nbsp;
                                </Typography>
                                <Typography variant="h6" component="h2">
                                    {post.id}
                                </Typography>
                            </Box>
                            <Box sx={styles.row}>
                                <Typography sx={styles.title} variant="h6" component="h2">
                                    Name:&nbsp;
                                </Typography>
                                <Typography variant="h6" component="h2">
                                    {post.name}
                                </Typography>
                            </Box>
                            <Box sx={styles.row}>
                                <Typography sx={styles.title} variant="h6" component="h2">
                                    Email:&nbsp;
                                </Typography>
                                <Typography variant="h6" component="h2">
                                    {post.email}
                                </Typography>
                            </Box>
                            <Box sx={styles.row}>
                                <Typography sx={styles.title} variant="h6" component="h2">
                                    Description:&nbsp;
                                </Typography>
                                <Typography variant="h6" component="h2">
                                    {post.body}
                                </Typography>
                            </Box>

                            <Button onClick={handleClose} sx={styles.button} variant='outlined' color='error'>Cancel</Button>
                        </Box>
                    </Modal>
                )
            }
        </>
    );
}