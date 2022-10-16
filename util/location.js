const API_KEY = "AIzaSyDJ4LyuAmew9ORe4TtmuNSw6cZxi7tz1E8"

const getMapPreview = (lat, lng) => {
    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=18&size=1000x1000&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${API_KEY}`
    return mapPreviewUrl
}

const getMapLocation = async (lat, lng) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
    if (!response.ok) {
        throw new Error('Something went wrong')
    }
    const resData = await response.json()
    if (!resData.results) {
        throw new Error('Something went wrong')
    }
    const address = resData.results[0].formatted_address
    return address
}

export { getMapPreview, getMapLocation }