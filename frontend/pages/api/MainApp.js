import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import {
    Button
} from "@mui/material";


const Main = () => {
    return (
        <Wrapper>
            <div>
               <Button path="/login" component={Link}>
                   Login
               </Button>
               |
               <Button path="/register" component={Link}>
               </Button>
            </div>
        </Wrapper>
    )
}

export default Main


const Wrapper = styled.div`
    display:flex;
    max-height:calc(100vh - 64px);
    overflow:hidden;
    overflow-y:scroll;
    ::-webkit-scrollbar{
        display:none;
    }
    & div {
        border-radius:0.4rem;
    }
`
