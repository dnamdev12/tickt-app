import React from 'react';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const DocViewerComponent = ({ src, width, height }) => {
    // https://docs.google.com/viewer?url=
    let checkFormat = src;
    let splitElements = checkFormat.split('.');
    let extension = splitElements[splitElements?.length - 1];
    let screenWidth = window.screen.width;
    // console.log({ src, width, height, screenWidth })
    return (
        <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={[{ uri: src, fileType: extension }]}
            style={{
                height: height ? height : window.screen.height,
                width: '100%',
                paddingTop: width !== '100%' ? 80 : 0
            }}
            theme={{
                disableThemeScrollbar: true,
            }}
            config={{
                header: {
                    disableHeader: true,
                    disableFileName: true,
                    retainURLParams: true,
                }
            }}
        />
    )

    // return (
    //     <div>
    //         <iframe
    //             src={'https://docs.google.com/gview?url=' + src + '&embedded=true'}
    //             sandbox='allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation'
    //             allow="fullscreen"
    //             allowFullScreen="allow"
    //             title="file"
    //             width={width || '100%'}
    //             style={{ minHeight: height || '800px', maxHeight: '2000px' }}
    //         // style={{ Height: '450px', maxHeight: '450px', overflowY: 'scroll' }}
    //         ></iframe>
    //     </div>
    // )
}

export default DocViewerComponent;
