import React from 'react';

class Photo extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    // }



    render(){
        const bgStyle = {
            backgroundImage: "url(" + this.props.elementUrl.baseUrl + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'noRepeat'
        };
        return <div className="col-xs-4 col-sm-3 col-md-3">
            <div className="thumbnail photo" >
                <div className="photo_img" style={ bgStyle }/>
            </div>
        </div>

    }
}

export default Photo;