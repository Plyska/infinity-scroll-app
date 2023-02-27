import { useState, ChangeEvent, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Post } from '../../types/Post';
import { useAppDispatch } from '../../hooks/redux';
import { postSlice } from '../../store/reducers/PostSlice';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const CustomInput: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        if (inputValue.length >= 3) {
            dispatch(postSlice.actions.userFetching());
            axios.get<Post[]>(`${process.env.REACT_APP_URL}/comments?q=${inputValue}`).then((responce) => {
                dispatch(
                    postSlice.actions.userFetchingSuccess(responce.data)
                );
            }).catch(e => dispatch(postSlice.actions.userFetchingError(e.message)));
        } else {
            dispatch(postSlice.actions.userFetching());
            axios.get<Post[]>(`${process.env.REACT_APP_URL}/comments?q=`).then((responce) => {
                dispatch(
                    postSlice.actions.userFetchingSuccess(responce.data)
                );
            }).catch(e => dispatch(postSlice.actions.userFetchingError(e.message)));
        }
    }, [inputValue])

    return (
        <StyledInputBase
            value={inputValue}
            onChange={handleChange}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
        />
    )
}


export default CustomInput;
