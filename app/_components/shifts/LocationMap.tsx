'use client'

import { Location } from '@/app/_types/Location'
import styles from '../map/Map.module.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '@/custom-icon'
import { useTranslations } from 'next-intl'


/**This component show map with 2 marks
 * 
 * first for start location
 * 
 * second for en location (if the shift ended)
 */
const LocationMap = ({
    startLocation
    , endLocation
}: {
    startLocation: Location,
    endLocation?: Location
}) => {

    const t = useTranslations()

    /**Location in leaflet must be in order [latitude, longitude]
     * 
     * where' location is [longitude, latitude]
     * 
     * so simply apply reverse to start & end locations
     */
    const startPoint = startLocation.slice().reverse() as Location
    const endPoint = endLocation?.slice().reverse() as Location


    return (
        <div className={styles.mapContainer}>
            <MapContainer
                className={styles.map + ' w-full rounded-sm'}
                style={{ height: '35vh' }}
                center={startPoint}
                zoom={16}
                scrollWheelZoom={true}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <Marker
                    position={startPoint}
                >
                    <Popup>
                        <span>{t('start_location_desc')}</span>
                    </Popup>
                </Marker>

                {
                    endLocation &&
                    <Marker
                        position={endPoint}
                    >
                        <Popup>
                            <span>{t('end_location_desc')}</span>
                        </Popup>
                    </Marker>
                }

            </MapContainer>
        </div>
    )
}

export default LocationMap