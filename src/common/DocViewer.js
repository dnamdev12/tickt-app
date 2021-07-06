import React from 'react'

const DocViewer = ({ src, width, height }) => {
    return (
        <div>
            <iframe
                src={'https://docs.google.com/viewer?url=' + src + '&embedded=true'}
                sandbox='allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation'
                allow="fullscreen"
                allowFullScreen="allow" 
                title="file"
                width={width || '100%'}
                style={{minHeight: height || '800px', maxHeight:'2000px'}}
                // style={{ Height: '450px', maxHeight: '450px', overflowY: 'scroll' }}
            ></iframe>
        </div>
    )
}

export default DocViewer;
