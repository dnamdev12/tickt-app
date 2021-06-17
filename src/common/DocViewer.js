import React from 'react'

const DocViewer = ({src, width, height}) => {
    return (
        <div>
            <iframe
                src={`https://docs.google.com/viewer?url=${src}&embedded=true`}
                title="file"
                width={width}
                height={height}
            ></iframe>
        </div>
    )
}

export default DocViewer;
