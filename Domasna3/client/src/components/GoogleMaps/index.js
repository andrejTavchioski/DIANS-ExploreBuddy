import GoogleMapReact from 'google-map-react';

import { Wrapper, Marker } from './styles';

import marker_cave from '../../resources/marker_cave.png';
import marker_lake from '../../resources/marker_lake.png';
import marker_lodge from '../../resources/marker_lodge.png';
import marker_peak from '../../resources/marker_peak.png';
import marker_river from '../../resources/marker_river.png';
import marker_waterfall from '../../resources/marker_waterfall.png';
import { useContext } from 'react';
import { UtilsContext } from '../../context/UtilsContex';
import { placesType } from '../../config/enums';

const ChoosenMarker = ({ type, isSelected, id, onMarkerClick, lt, long }) => {
    let src;
    switch (type) {
        case placesType.SPRING:
            src = marker_river;
            break;
        case placesType.CAVE:
            src = marker_cave;
            break;
        case placesType.LAKE:
            src = marker_lake;
            break;
        case placesType.PEAK:
            src = marker_peak;
            break;
        case placesType.LODGE:
            src = marker_lodge;
            break;
        case placesType.WATERFALL:
            src = marker_waterfall;
            break;
        default:
            src = null;
    }
    const selectedStyle = {
        transform: 'translate(-50%, -125%) scale(1.5)',
    };
    return (
        <Marker
            src={src}
            style={isSelected ? selectedStyle : null}
            onClick={() => onMarkerClick({ id, type, lat: lt, long })}
        />
    );
};

const GoogleMaps = ({ data }) => {
    const { selectedPlace, getPlaceDesc } = useContext(UtilsContext);
    const defaultProps = {
        center: {
            lat: 41.661351,
            lng: 21.703956,
        },
        zoom: 8.5,
    };
    const onMarkerClick = ({ id, type, lat, long }) => {
        getPlaceDesc({ id, type, lat, long });
    };
    return (
        <Wrapper>
            <GoogleMapReact
                center={defaultProps.center}
                zoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals={true}
            >
                {data.map((d, ind) => (
                    <ChoosenMarker
                        key={ind}
                        type={d.type}
                        isSelected={selectedPlace?.id === d.id}
                        id={d.id}
                        lat={d.lat}
                        lng={d.long}
                        lt={d.lat}
                        long={d.long}
                        onMarkerClick={onMarkerClick}
                    />
                ))}
            </GoogleMapReact>
        </Wrapper>
    );
};

export default GoogleMaps;
