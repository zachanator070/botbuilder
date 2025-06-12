import React, {useEffect} from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

export default function RunMap() {
    const [position, setPosition] = React.useState<GeolocationPosition>();

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            setPosition(position);
        });
    }, []);

    return <div>
        <div>
            <button>Start Run</button>
        </div>
        <div style={{

        }}>
            {
                position ?
                    <APIProvider apiKey={'AIzaSyBbM26X26dlzQVV-iUNKu1ba8XhfEBLYic'}>
                        <Map defaultZoom={5} center={{lat: position.coords.latitude, lng: position.coords.longitude}}></Map>
                    </APIProvider>
                    : <div>Loading...</div>
            }
        </div>
    </div>;
}