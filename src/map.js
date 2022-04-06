// Create variable to hold map element, give initial settings to map
var map = L.map('map', {
    center: [14.90, -92.26],
    zoom: 13,
    minZoom: 13,
    scrollWheelZoom: false,
});

map.once('focus', function() { map.scrollWheelZoom.enable(); });

L.easyButton('<img src="images/fullscreen.png">', function (btn, map) {
    var cucu = [14.90, -92.26];
    map.setView(cucu, 13);
}).addTo(map);


var esriAerialUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services' +
    '/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var esriAerialAttrib = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, ' +
    'USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the' +
    ' GIS User Community';
var esriAerial = new L.TileLayer(esriAerialUrl,
    {maxZoom: 16, attribution: esriAerialAttrib}).addTo(map);


var opens = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
});


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
            this._div.innerHTML = (props ?
                'Viviendas ' + props.VIV_P + '<br />' +
                'Personas ' + props.POB + '<br />' +  '<br />' + 
        
                '<b>Vivienda </b>' + '<br />' +
                'Vivienda adecuada: ' + props.V_ADE.toFixed(0) + ' %' + '<br />' +
                'Espacio vital suficiente: ' + props.ESP_VIT.toFixed(0) + ' %' + '<br />' +
                'Agua mejorada: ' + props.A_AGUA.toFixed(0) + ' %' + '<br />' +
                'Saneamiento: ' + props.A_SAN.toFixed(0) + ' %' + '<br />' +
                'Electricidad: ' + props.A_ELEC.toFixed(0) + ' %' + '<br />' +
                'Internet: ' + props.A_INTER.toFixed(0) + ' %' + '<br />' + 
                'Dependencia económica: ' + props.DEP_ECONO.toFixed(2) + '<br />' +  '<br />' +  
        
                '<b>Salud</b>' + '<br />' +
                'Proximidad centros de salud: ' + props.D_PCENTROA.toFixed(0) + ' m' + '<br />' +
                'Proximidad hospitales: ' + props.D_PHOSP.toFixed(0) + ' m' + '<br />' +
                'Concentración de Pm10: ' + props.PM10.toFixed(2) + ' µg/m3' +  '<br />' +   
                'Contaminación residuos sólidos: 33.9 %' + '<br />' + 
                'Esperanza de vida al nacer: ' + props.E_VIDA.toFixed(0) + ' años' + '<br />' +
                'Brecha género esperanza de vida al nacer: ' + props.B_E_VIDA.toFixed(2) + '<br />' +  '<br />' +   
                
                '<b>Educación, cultura y diversidad </b>' + '<br />' +
                'Proximidad equipamientos culturales: ' + props.DP_CULT.toFixed(0) + ' m' + '<br />' +
                'Proximidad equipamientos educativos: ' + props.DP_EDU.toFixed(0) + ' m' + '<br />' +
                'Diversidad nivel educativo: ' + props.MIX_EDU.toFixed(2) +'/2.20' +  '<br />' +
                'Diversidad edades: ' + props.MIX_EDAD.toFixed(2) + '/1.79' + '<br />' +
                'Diversidad etnias y razas: ' + props.MIX_ETNIA.toFixed(2) + '/1.61' +'<br />' +
                'Brecha género años promedio educación: ' + props.BRECHA_ESC.toFixed(2) + '<br />' +
                'Años promedio educación: ' + props.PRO_ESC.toFixed(0) + ' años'+ '<br />' +  '<br />' +  
                
                '<b>Espacios públicos, seguridad y recreación </b>' + '<br />' +
                'Proximidad espacio público: ' + props.DP_EP.toFixed(0) + ' m' + '<br />' +
                'M² per capita de espacio público: ' + props.M2_ESP_PU.toFixed(2) + '<br />' +
                'Densidad residencial: ' + props.DEN_POB.toFixed(0) + '<br />' +
                'Tasa de hurtos x 100mil habitantes: ' + props.HURTOS.toFixed(1) + '<br />' +
                'Tasa de homicidios x 100mil habitantes: ' + props.HOMICIDIOS.toFixed(1) + '<br />' +
                'Diversidad usos del suelo: ' + props.SHANNON.toFixed(2) + '/1.61' +'<br />' + '<br />' +
        
                '<b>Oportunidades económicas </b>' + '<br />' +
                'Proximidad zonas de interés económico (servicios y comercio): ' + props.DP_CENT.toFixed(0) + ' m' + '<br />' +
                'Desempleo: ' + props.T_DESEMP.toFixed(2) + ' %' + '<br />' +
                'Empleo: ' + props.EMPLEO.toFixed(0) + ' %' + '<br />' +
                'Brecha género desempleo: ' + props.BRECHA_DES.toFixed(2)  : 'Seleccione una manzana');
        };
        info.addTo(map);
        

function stylec(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#ffffff',
        fillOpacity: 0,
        dashArray: '3',
    };
}

/*var loc = L.geoJson(localidad, {
    style: stylec,
    onEachFeature: popupText,
}).addTo(map);*/

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#494949',
        dashArray: '',
        fillOpacity: 0.7,
        opacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function changeLegend(props) {
    var _legend = document.getElementById('legend'); // create a div with a class "info"
    _legend.innerHTML = (props ?
        `<p style="font-size: 11px"><strong>${props.title}</strong></p>
            <p style="font-size: 10px">${props.subtitle}</p>
            <p id='colors'>
                ${props.elem1}
                ${props.elem2}
                ${props.elem3}
                ${props.elem4}
                ${props.elem5}
                ${props.elem6}
                ${props.elem7}<br>
                <span style='color:#000000'>Fuente: </span>${props.elem8}<br>
            </p>` :
        `<p style="font-size: 12px"><strong>Área urbana</strong></p>
            <p id='colors'>
                <span style='color:#c3bfc2'>▉</span>Manzanas<br>
            </p>`);
}

var legends = {
    PRO_ESC: {
        title: "Años promedio educación",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 14</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>11 - 13</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>9 - 10</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>4 - 8</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 3</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    SHANNON: {
        title: "Diversidad usos del suelo",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.17 - 1.53</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.93 - 1.16</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.72 - 0.92</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.48 - 0.71</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.01 - 0.47</div>',
        elem6: '',
        elem7: '',
        elem8: "Alcalcía de Barranquilla",
    },
   V_ADE: {
        title: "Vivienda Adecuada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 95</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>85 - 95</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>68 - 84</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>28 - 67</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Menor 27</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    A_AGUA: {
        title: "Acceso a agua mejorada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>96 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>84 - 95</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>65 - 83</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>27 - 64</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 26</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    A_SAN: {
        title: "Acceso a saneamiento",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>90 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>80 - 89</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>20 - 79</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 19</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },  
    DESEM_JUVE: {
        title: "Desempleo juvenil",
        subtitle: "% de Personas entre 15 y 24 años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 4</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>5 - 11</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>12 - 20</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 38</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>39 - 89</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    }, 
    A_INTER: {
        title: "Acceso a internet",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>80 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>59 - 79</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>39 - 58</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>15 - 38</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 14</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    }, 
    T_DESEMP: {
        title: "Tasa de desempleo",
        subtitle: "% de Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 3</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>4 - 10</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>11 - 18</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>19 - 38</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>39 - 100</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    }, 
    PM10: {
        title: "Concentración Pm10",
        subtitle: "µg/m3",
        elem1: '<div><span  style= "color:#f4f466">▉</span>32.38</div>',
        elem2: '', 
        elem3: '',
        elem4: '',
        elem5: '',
        elem6: '',
        elem7: '',
        elem8: "IQAIR Tapachula Mapa Calidad del Aire 2022",
    },
    VEN: {
        title: "Población de origen Venezuela",
        subtitle: "Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1 - 5</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>6 - 25</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>26 - 77</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>78 - 100</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>100 - 205</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    MAX_EST: {
        title: "Estratificación socioeconómica",
        subtitle: "Máximo conteo",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Estrato 6</div>',
        elem2: '<div><span  style= "color:#82E0AA">▉</span>Estrato 5</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>Estrato 4</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>Estrato 3</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>Estrato 2</div>',
        elem6: '<div><span  style= "color:#d7191c">▉</span>Estrato 1</div>',
        elem7: '<div><span  style= "color:#c3bfc2">▉</span>Sin estrato</div>',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    MIX_ETNIA: {
        title: "Diversidad etnias y razas",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.45 - 0.71</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.29 - 0.44</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.19 - 0.28</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.07 - 0.18</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.06</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    MIX_EDU: {
        title: "Diversidad nivel educativo",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.95 - 1.10</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.79 - 0.94</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.54 - 0.78</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.26 - 0.53</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.25</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    MIX_EDAD: {
        title: "Diversidad edades",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.39 - 1.73</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.11 - 1.38</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.75 - 1.10</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.37 - 0.74</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.36</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    DEN_POB: {
        title: "Densidad residencial",
        subtitle: "Población/ha", 
        elem1: '<div><span  style= "color:#a6d96a">▉</span>0 - 50</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>51 - 150</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>151 - 200</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>201 - 300</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Mayor 301</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    D_PCENTROA: {
        title: "Proximidad centros de salud",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 1500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1501 - 3000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3001 - 6316</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "INEGI 2020",
    },
    D_PHOSP: {
        title: "Proximidad hospitales",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 1500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1501 - 3000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3001 - 5133</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "INEGI 2020",
    },
    VIV_ADE: {
        title: "Vivienda Adecuada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>91 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>78 - 90</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>42 - 77</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>6 - 41</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    ESP_VIT: {
        title: "Espacio vital suficiente",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>100 - No hacinadas</div>',
        elem2: '<div><span  style= "color:#d7191c">▉</span>0 - Hacinadas</div>', 
        elem3: '',
        elem4: '',
        elem5: '',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    A_ELEC: {
        title: "Acceso a electricidad",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>91 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>73 - 90</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>64 - 72</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 63</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    DEP_ECONO: {
        title: "Dependencia económica",
        subtitle: "Población/Población ocupada",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.00 - 1.90</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.91 - 2.49</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>2.50 - 3.67</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3.68 - 9.00</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Mayor 9.00</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    CON_SOL: {
        title: "Contaminación residuos sólidos",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 4</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>5 - 16</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>17 - 33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>34 - 64</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>65 - 100</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    E_VIDA: {
        title: "Esperanza de vida al nacer",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>74.3</div>',
        elem2: '', 
        elem3: '',
        elem4: '',
        elem5: '',
        elem6: '',
        elem7: '',
        elem8: "INEGI 2020",
    },
    B_E_VIDA: {
        title: "Brecha género esperanza de vida al nacer",
        subtitle: "Relación esperanza de vida al nacer de mujeres y hombres",
        elem1: '<div><span  style= "color:#a6d96a">▉</span>1.07</div>',
        elem2: '', 
        elem3: '',
        elem4: '',
        elem5: '',
        elem6: '',
        elem7: '',
        elem8: "INEGI 2020",
    },
    DP_CULT: {
        title: "Proximidad equipamientos culturales",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>27 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 3000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3001 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 7422</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Google Earth 2022",
    },
    DP_EDU: {
        title: "Proximidad equipamientos educativos",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>6 - 300</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>301 - 500</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>501 - 700</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>701 - 900</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>901 - 1041</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    BRECHA_ESC: {
        title: "Brecha género años promedio educación",
        subtitle: "Relación años promedio educación de mujeres y hombres", 
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.99</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>1.00 - 1.05</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.06 - 1.14</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>1.15 - 1.44</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>1.45 - 2.25</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    DP_EP: {
        title: "Proximidad espacio público",
        subtitle: "Distancia en m x Factor inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 2000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>2001 - 3000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3001 - 3237</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Google Earth 2022",
    },
    M2_ESP_PU: {
        title: "M² per capita de espacio público",
        subtitle: "m²/habitante",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 15</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>11 - 15</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>9 - 10</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>4 - 8</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 3</div>',
        elem6: '',
        elem7: '',
        elem8: "Google Earth 2022",
    },
    DP_CENT: {
        title: "Proximidad zonas de interés económico (servicios y comercio)",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 2000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>2001 - 3000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3001 - 7161</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Directorio Estadístico Nacional de Unidades Económicas",
    },
    EMPLEO: {
        title: "Empleo",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#d7191c">▉</span>0 - 41</div>',
        elem2: '<div><span  style= "color:#fdae61">▉</span>42 - 54</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>55 - 65</div>',
        elem4: '<div><span  style= "color:#a6d96a">▉</span>66 - 78</div>',
        elem5: '<div><span  style= "color:#1a9641">▉</span>79 - 100</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    BRECHA_DES: {
        title: "Brecha de género desempleo",
        subtitle: "Relación desempleo de mujeres y hombres",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.00 - 0.89</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.90 - 1.00</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.01 - 1.62</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1.63 - 3.14</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3.15 - 6.44</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    HOMICIDIOS: {
        title: "Tasa de homicidios",
        subtitle: "Homicidios x 100mil habitantes",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.13</div>',
        elem2: 'Tasa de Tapachula', 
        elem3: '',
        elem4: '',
        elem5: '',
        elem6: '',
        elem7: '',
        elem8: "Secretaría de Seguridad Pública y Protección Ciudadana Municipal 2021",
    },
    HURTOS: {
        title: "Tasa de hurtos",
        subtitle: "Hurtos x 100mil habitantes",
        elem1: '<div><span  style= "color:#1a9641">▉</span>5.65</div>',
        elem2: 'Tasa de Tapachula', 
        elem3: '',
        elem4: '',
        elem5: '',
        elem6: '',
        elem7: '',
        elem8: "Secretaría de Seguridad Pública y Protección Ciudadana Municipal 2021",
    },
    E_INFOR: {
        title: "Empleo informal estricto",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 2</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>3 - 8</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>9 - 20</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 46</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>47 - 73</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
    E_INFOR_E: {
        title: "Empleo informal estricto",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 2</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>3 - 8</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>9 - 20</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 46</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>47 - 73</div>',
        elem6: '',
        elem7: '',
        elem8: "INEGI Censo de Población y Vivienda 2020",
    },
}

var indi;

function resetHighlight(e) {
    indi.setStyle(fillColor);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

indi = L.geoJson(Manzana, {
    style: legends.DEN_POB,
    onEachFeature: onEachFeature
}).addTo(map);

var currentStyle = 'DEN_POB';

function setProColor(d) {
    if (currentStyle === 'V_ADE') {
        return d > 95 ? '#1a9641' :
            d > 84 ? '#a6d96a' :
                d > 67 ? '#f4f466' :
                    d > 27 ? '#fdae61' :
                        '#d7191c';
    }else if (currentStyle === 'A_AGUA') {
        return d > 95 ? '#1a9641' :
            d > 83 ? '#a6d96a' :
                d > 64 ? '#f4f466' :
                    d > 26 ? '#fdae61' :
                        '#d7191c';
    } 
    else if (currentStyle === 'A_SAN') {
        return d > 97 ? '#1a9641' :
            d > 89 ? '#a6d96a' :
                d > 79 ? '#f4f466' :
                    d > 19 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'PRO_ESC') {
        return d > 13 ? '#1a9641' :
            d > 10 ? '#a6d96a' :
                d > 8 ? '#f4f466' :
                    d > 3 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'SHANNON') {
        return d > 1.116 ? '#1a9641' :
            d > 0.92 ? '#a6d96a' :
                d > 0.71 ? '#f4f466' :
                    d > 0.47 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'DESEM_JUVE') {
                        return d > 38 ? '#d7191c' :
                        d > 20 ? '#fdae61' :
                            d > 11 ? '#f4f466' :
                                d > 4 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'A_INTER') {
        return d > 79 ? '#1a9641' :
            d > 58 ? '#a6d96a' :
                d > 38 ? '#f4f466' :
                    d > 14 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'T_DESEMP') {
        return d > 38 ? '#d7191c' :
                        d > 18 ? '#fdae61' :
                            d > 10 ? '#f4f466' :
                                d > 3 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'PM10') {
        return d > 32.2 ? '#f4f466' :
                    '#1a9641';
    }
    else if (currentStyle === 'DES_RANGO') {
        return d > 11 ? '#d7191c' :
            d > 8 ? '#fdae61' :
                d > 5 ? '#f4f466' :
                    d > 2 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'MAX_EST') {
        return d > 5 ? '#1a9641':
            d > 4 ? '#82E0AA'  :
            d > 3 ? '#a6d96a'  :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#fdae61' :
                    d > 0 ? '#d7191c':
                    '#c3bfc2';
    }
    else if (currentStyle === 'VEN') {
        return d > 100 ? '#d7191c' :
            d > 77 ? '#fdae61' :
                d > 25 ? '#f4f466' :
                    d > 5 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'MIX_ETNIA') {
        return d > 0.44 ? '#1a9641' :
            d > 0.28 ? '#a6d96a' :
                d > 0.18 ? '#f4f466' :
                    d > 0.06 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDU') {
        return d > 0.94 ? '#1a9641' :
            d > 0.78 ? '#a6d96a' :
                d > 0.53 ? '#f4f466' :
                    d > 0.25 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDAD') {
        return d > 1.38 ? '#1a9641' :
            d > 1.10 ? '#a6d96a' :
                d > 0.74 ? '#f4f466' :
                    d > 0.36 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'DEN_POB') {
        return d > 300 ? '#d7191c' :
            d > 200 ? '#fdae61' :
                d > 150 ? '#f4f466' :
                    d > 50 ? '#1a9641' :
                    '#a6d96a';
    }
    else if (currentStyle === 'D_PCENTROA') {
        return d > 3000 ? '#d7191c' :
            d > 1500 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'P_SALUD') {
        return d > 3000 ? '#d7191c' :
            d > 1500 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'D_PHOSP') {
        return d > 3000 ? '#d7191c' :
            d > 1500 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'VIV_ADE') {
        return d > 97 ? '#1a9641' :
            d > 90 ? '#a6d96a' :
                d > 77 ? '#f4f466' :
                    d > 41 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'ESP_VIT') {
        return d > 1 ? '#1a9641' :
                    '#d7191c';
    }
    else if (currentStyle === 'HOMICIDIOS') {
        return d > 1 ? '#1a9641' :
                    '#d7191c';
    }
    else if (currentStyle === 'A_ELEC') {
        return d > 97 ? '#1a9641' :
            d > 90 ? '#a6d96a' :
                d > 72 ? '#f4f466' :
                    d > 63 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'DEP_ECONO') {
        return d > 9 ? '#d7191c' :
            d > 3.67 ? '#fdae61' :
                d > 2.49 ? '#f4f466' :
                    d > 1.90 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'CON_SOL') {
        return d > 64 ? '#d7191c' :
            d > 33 ? '#fdae61' :
                d > 16 ? '#f4f466' :
                    d > 4 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'E_VIDA') {
        return d > 73 ? '#1a9641' :
                    '#d7191c';
    }
    else if (currentStyle === 'B_E_VIDA') {
        return d > 1 ? '#a6d96a' :
                    '#d7191c'; 
    }
    else if (currentStyle === 'DP_CULT') {
        return d > 5000 ? '#d7191c' :
            d > 3000 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'DP_EDU') {
        return d > 900 ? '#d7191c' :
            d > 700 ? '#fdae61' :
                d > 500 ? '#f4f466' :
                    d > 300 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'BRECHA_ESC') {
        return d > 1.44 ? '#fdae61' :
            d > 1.14 ? '#f4f466' :
                d > 1.05 ? '#a6d96a' :
                    d > 0.99? '#1a9641' :
                    '#d7191c';
    }
    else if (currentStyle === 'DP_EP') {
        return d > 3000 ? '#d7191c' :
            d > 2000 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'M2_ESP_PU') {
        return d > 15 ? '#1a9641' :
            d > 10 ? '#a6d96a' :
                d > 8 ? '#f4f466' :
                    d > 3 ? '#fdae61':
                    '#d7191c';
    }
    else if (currentStyle === 'DP_CENT') {
        return d > 3000 ? '#d7191c' :
            d > 2000 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'EMPLEO') {
        return d > 78 ? '#1a9641' :
            d > 65 ? '#a6d96a' :
                d > 54 ? '#f4f466' :
                    d > 41 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'BRECHA_DES') {
        return d > 3.14 ? '#d7191c' :
            d > 1.62 ? '#fdae61' :
                d > 1 ? '#f4f466' : 
                    d > 0.89 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'E_INFOR') {
        return d > 46 ? '#d7191c' :
        d > 20 ? '#fdae61' :
            d > 8 ? '#f4f466' :
                d > 2 ? '#a6d96a':
                '#1a9641';
}
    else {
        return d > 3 ? '#1a9641' :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#a6d96a' :
                        '#1a9641';
    }

}

function fillColor(feature) {
    return {
        fillColor:  setProColor(feature.properties[currentStyle]),
        weight: 0.6,
        opacity: 0.1,
        color: (currentStyle) ? '#ffffff00' : '#c3bfc2', 
        fillOpacity: (currentStyle) ? 0.9 : 0.5,
    };
}

function changeIndi(style) {
    currentStyle = style.value;
    indi.setStyle(fillColor);
    changeLegend((style.value && legends[style.value]) ? legends[style.value] :
        {
            
        });
}

var baseMaps = {
    'Esri Satellite': esriAerial,
    'Open Street Map': opens

};

// Defines the overlay maps. For now this variable is empty, because we haven't created any overlay layers
var overlayMaps = {
    //'Comunas': comu,
    //'Límite fronterizo con Venezuela': lim
};

// Adds a Leaflet layer control, using basemaps and overlay maps defined above
var layersControl = new L.Control.Layers(baseMaps, overlayMaps, {
    collapsed: true,
});
map.addControl(layersControl);
changeIndi({value: 'DEN_POB'});

function popupText(feature, layer) {
    layer.bindPopup('Localidad ' + feature.properties.LOCALIDAD + '<br />')
}
