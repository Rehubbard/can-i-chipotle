export const autocompleteService = new window.google.maps.places.AutocompleteService()
export const geocoderService = new window.google.maps.Geocoder()
export const placesOKStatus = window.google.maps.places.PlacesServiceStatus.OK

export const placesService = (map) => new window.google.maps.places.PlacesService(map)

export const mapService = (element, options) => new window.google.maps.Map(element, options)