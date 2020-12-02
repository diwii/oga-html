function map() {
    var mapProp= {
    center:new google.maps.LatLng(57.04660518154071, 22.56914560030886),
    zoom:15,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}