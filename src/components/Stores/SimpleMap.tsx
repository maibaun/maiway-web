import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }:any) => <div>{text}</div>;

class SimpleMap extends Component <{}, {center: any}>{
  static defaultProps = {
    center:{
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
        <>
    
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCfYCam9LoTBqherZAtERrPrkOD1ZzlSzU' }}
                
                defaultZoom= {12}
                >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
                </GoogleMapReact>
            </div>
        </>
    );
  }
}

export default SimpleMap;