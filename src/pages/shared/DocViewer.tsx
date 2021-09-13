import React, { Component } from 'react'
import DocViewer from '../../common/DocViewer';
import { useLocation } from 'react-router';

const DocViewerComponent = (props:any) => {
    let location = useLocation();
    console.log({location})

    const params = new URLSearchParams(location?.search);
    const Url = params.get('url');
    console.log({Url})
    return (
        <div>
            <DocViewer
                src={Url}
                width={window.screen.width}
                height={window.screen.height}
            />
        </div>
    )
}


export default DocViewerComponent;