import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { toyService } from '../services/toy.service'

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>

export function StoreLocations() {
    const locations = useSelector(storeState => storeState.toyModule.locations)
    const [apiKey, setApiKey] = useState('')
    const [center, setCenter] = useState({})
    const zoom = 11

    useEffect(() => {
        const fetchApiKey = async () => {
            const api = await toyService.getGoogleMapsAPI()
            setApiKey(api)
        }
        fetchApiKey()
    }, [])

    useEffect(() => {
        if (locations.length > 0) setCenter(locations[2].loc)
    }, [apiKey])

    function onMapClicked({ lat, lng }) {
        setCenter({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <section className="locations">
            <h2>Where Magic Happens</h2>
            <div className="store-locations">
                <div className="locations-buttons">
                    {
                        locations.map(location => <button key={location.id} className="btn btn-light btn-location" onClick={() => onMapClicked(location.loc)}>{location.name}</button>)
                    }
                </div>

                <div className="google-map" style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: apiKey }}
                        center={center}
                        defaultZoom={zoom}
                    >
                        {locations.map(location =>
                            <AnyReactComponent
                                key={location.id}
                                lat={location.loc.lat}
                                lng={location.loc.lng}
                                text="🧸"
                                onClick={onMapClicked}
                            />)}
                    </GoogleMapReact>
                </div>
            </div>
        </section>
    )
}
