import React from 'react'

const DocViewer = ({ src, width, height }) => {
    return (
        <div>
            <iframe
                src={'https://docs.google.com/viewer?url=' + src + '&embedded=true'}
                sandbox=''
                title="file"
                width={width || '100%'}
                style={{ Height: '450px', maxHeight: '450px', overflowY: 'scroll' }}

            

            ></iframe>
        </div>
    )
}

export default DocViewer;
