import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props{
    invrted?: boolean;
    content?: string;
}

export default function LoadingComponents({invrted=true, content='Loading...'}: Props){
return(
    <Dimmer active={true} inverted={invrted}>
        <Loader content={content}></Loader>
    </Dimmer>
)
}