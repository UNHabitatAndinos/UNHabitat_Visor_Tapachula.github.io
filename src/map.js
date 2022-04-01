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
    ESC_ANOS: {
        title: "Años promedio educación",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 16</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>14 - 15</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>12 - 13</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>9 - 11</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3 - 8</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIXTICIDAD: {
        title: "Diversidad usos del suelo",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.06 - 1.67</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.79 - 1.05</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.54 - 0.78</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.30 - 0.53</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.29</div>',
        elem6: '',
        elem7: '',
        elem8: "Alcalcía de Barranquilla",
    },
    P_MAT_ADE: {
        title: "Vivienda Adecuada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 86</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>66 - 85</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>36 - 65</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>16 - 35</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Menor 15</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    A_ACU: {
        title: "Acceso a agua mejorada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>89 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>74 - 88</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>46 - 73</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>4 - 45</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    A_ALC: {
        title: "Acceso a saneamiento",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>97 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>86 - 96</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>65 - 85</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>30 - 64</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 29</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
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
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    A_INTER: {
        title: "Acceso a internet",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>86 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>52 - 85</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>33 - 51</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>14 - 32</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 13</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    T_DESEMP: {
        title: "Tasa de desempleo",
        subtitle: "% de Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 10</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>11 - 20</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>21 - 30</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>31 - 50</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>51 - 90</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    PM10: {
        title: "Concentración Pm10",
        subtitle: "µg/m3",
        elem1: '<div><span  style= "color:#1a9641">▉</span>37 - 39</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>40 - 41</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>42 - 43</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>44 - 45</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>46 - 47</div>',
        elem6: '',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
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
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
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
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_ETNIA: {
        title: "Diversidad etnias y razas",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.25 - 0.50</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.15 - 0.24</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.09 - 0.14</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.03 - 0.08</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.02</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDU: {
        title: "Diversidad nivel educativo",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.56 - 1.98</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.34 - 1.55</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.08 - 1.33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.47 - 1.07</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.46</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDAD: {
        title: "Diversidad edades",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.54 - 1.74</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.45 - 1.53</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.34 - 1.44</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1.13 - 1.33</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.35 - 1.12</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    SHANON_ES: {
        title: "Diversidad ingresos",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.78 - 1.52</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.55 - 0.77</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.34 - 0.54</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.13 - 0.33</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.12</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
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
    P_SALUD: {
        title: "Proximidad centros de salud",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 1500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1501 - 3000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3001 - 5492</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    P_SALUD1: {
        title: "Proximidad hospitales",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 1000</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1001 - 2000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>2001 - 4000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>4001 - 8000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 12745</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
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
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    ES_VIT_SUF: {
        title: "Espacio vital suficiente",
        subtitle: "% de Hogares",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>91 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>83 - 90</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>72 - 82</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>25 - 71</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    A_ELEC: {
        title: "Acceso a electricidad",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>99 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>95 - 98</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>86 - 94</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>61 - 85</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>24 - 60</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    D_ECONO: {
        title: "Dependencia económica",
        subtitle: "Población/Población ocupada",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.00 - 2.51</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>2.52 - 3.24</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>3.25 - 5.33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>5.34 - 16.00</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>16.01 - 46.00</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
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
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    E_VIDA: {
        title: "Esperanza de vida al nacer",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>76 - 78</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>74 - 75</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>71 - 73</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>66 - 70</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>21 - 65</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    B_E_VIDA: {
        title: "Brecha género esperanza de vida al nacer",
        subtitle: "Relación esperanza de vida al nacer de mujeres y hombres",
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.83 - 0.98</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>0.99 - 1.03</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.04 - 1.07</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>1.08 - 1.17</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>1.18 - 1.85</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    P_BIB: {
        title: "Proximidad equipamientos culturales",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>46 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 3000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3001 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 11196</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    P_EDU: {
        title: "Proximidad equipamientos educativos",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>6 - 200</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>201 - 500</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>501 - 1000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1001 - 1500</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>1501 - 3108</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    DIF_M_H: {
        title: "Brecha género años promedio educación",
        subtitle: "Relación años promedio educación de mujeres y hombres", 
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.90</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>1.00 - 1.30</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.31 - 1.84</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>1.85 - 2.00</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>2.01 - 15.33</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    P_EP: {
        title: "Proximidad espacio público",
        subtitle: "Distancia en m x Factor inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>101 - 300</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>301 - 500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>501 - 800</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>801 - 1955</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
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
        elem8: "Alcaldía de Barranquilla",
    },
    P_COMSER: {
        title: "Proximidad zonas de interés económico (servicios y comercio)",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 50</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>51 - 200</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>201 - 500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>501 - 1000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>1001 - 1534</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    EMPLEO: {
        title: "Empleo",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#d7191c">▉</span>0 - 28</div>',
        elem2: '<div><span  style= "color:#fdae61">▉</span>29 - 41</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>42 - 49</div>',
        elem4: '<div><span  style= "color:#a6d96a">▉</span>50 - 58</div>',
        elem5: '<div><span  style= "color:#1a9641">▉</span>59 - 93</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    DESEM_M_H: {
        title: "Brecha de género desempleo",
        subtitle: "Relación desempleo de mujeres y hombres",
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.89</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>0.90 - 1.00</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.01 - 1.62</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>1.63 - 3.14</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>3.15 - 15.11</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    HOMICIDIOS: {
        title: "Tasa de homicidios",
        subtitle: "Homicidios x 100mil habitantes",
        elem1: '<div><span  style= "color:#1a9641">▉</span>11.3</div>',
        elem2: 'Tasa de la ciudad de Barranquilla', 
        elem3: '',
        elem4: '',
        elem5: '',
        elem6: '',
        elem7: '',
        elem8: "Instituto Nacional de Medicina Legal y Ciencias Forences",
    },
    HURTOS: {
        title: "Tasa de hurtos",
        subtitle: "Hurtos x 100mil habitantes",
        elem1: '<div><span  style= "color:#1a9641">▉</span>25.1</div>',
        elem2: 'Tasa de la ciudad de Barranquilla', 
        elem3: '',
        elem4: '',
        elem5: '',
        elem6: '',
        elem7: '',
        elem8: "Instituto Nacional de Medicina Legal y Ciencias Forences",
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
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
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
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
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
    if (currentStyle === 'P_MAT_ADE') {
        return d > 85 ? '#1a9641' :
            d > 65 ? '#a6d96a' :
                d > 35 ? '#f4f466' :
                    d > 15 ? '#fdae61' :
                        '#d7191c';
    }else if (currentStyle === 'A_ACU') {
        return d > 97 ? '#1a9641' :
            d > 88 ? '#a6d96a' :
                d > 73 ? '#f4f466' :
                    d > 45 ? '#fdae61' :
                        '#d7191c';
    } 
    else if (currentStyle === 'A_ALC') {
        return d > 86 ? '#1a9641' :
            d > 85 ? '#a6d96a' :
                d > 64 ? '#f4f466' :
                    d > 29 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'ESC_ANOS') {
        return d > 15 ? '#1a9641' :
            d > 13 ? '#a6d96a' :
                d > 11 ? '#f4f466' :
                    d > 8 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'MIXTICIDAD') {
        return d > 1.05 ? '#1a9641' :
            d > 0.78 ? '#a6d96a' :
                d > 0.53 ? '#f4f466' :
                    d > 0.29 ? '#fdae61' :
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
        return d > 85 ? '#1a9641' :
            d > 51 ? '#a6d96a' :
                d > 32 ? '#f4f466' :
                    d > 13 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'T_DESEMP') {
        return d > 50 ? '#d7191c' :
                        d > 30 ? '#fdae61' :
                            d > 20 ? '#f4f466' :
                                d > 10 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'PM10') {
        return d > 45 ? '#d7191c' :
            d > 43 ? '#fdae61' :
                d > 41 ? '#f4f466' :
                    d > 39 ? '#a6d96a' :
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
        return d > 0.24 ? '#1a9641' :
            d > 0.14 ? '#a6d96a' :
                d > 0.08 ? '#f4f466' :
                    d > 0.02 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDU') {
        return d > 1.55 ? '#1a9641' :
            d > 1.33 ? '#a6d96a' :
                d > 1.07 ? '#f4f466' :
                    d > 0.46 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'SHANON_ES') {
        return d > 0.77 ? '#1a9641' :
            d > 0.54 ? '#a6d96a' :
                d > 0.33 ? '#f4f466' :
                    d > 0.12 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDAD') {
        return d > 1.53 ? '#1a9641' :
            d > 1.44 ? '#a6d96a' :
                d > 1.33 ? '#f4f466' :
                    d > 1.12 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'DEN_POB') {
        return d > 300 ? '#d7191c' :
            d > 200 ? '#fdae61' :
                d > 150 ? '#f4f466' :
                    d > 50 ? '#1a9641' :
                    '#a6d96a';
    }
    else if (currentStyle === 'P_SALUD') {
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
    else if (currentStyle === 'P_SALUD1') {
        return d > 8000 ? '#d7191c' :
            d > 4000 ? '#fdae61' :
                d > 2000 ? '#f4f466' :
                    d > 1000 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'VIV_ADE') {
        return d > 97 ? '#1a9641' :
            d > 90 ? '#a6d96a' :
                d > 77 ? '#f4f466' :
                    d > 41 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'ES_VIT_SUF') {
        return d > 97 ? '#1a9641' :
            d > 90 ? '#a6d96a' :
                d > 82 ? '#f4f466' :
                    d > 71 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'A_ELEC') {
        return d > 98 ? '#1a9641' :
            d > 94 ? '#a6d96a' :
                d > 85 ? '#f4f466' :
                    d > 60 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'D_ECONO') {
        return d > 16 ? '#d7191c' :
            d > 5.33 ? '#fdae61' :
                d > 3.24 ? '#f4f466' :
                    d > 2.51 ? '#a6d96a' :
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
        return d > 75 ? '#1a9641' :
            d > 73 ? '#a6d96a' :
                d > 70 ? '#f4f466' :
                    d > 65 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'B_E_VIDA') {
        return d > 1.17 ? '#fdae61' :
            d > 1.08 ? '#f4f466' :
                d > 1.03 ? '#a6d96a':
                    d > 0.98 ? '#1a9641' :
                    '#d7191c'; 
    }
    else if (currentStyle === 'P_BIB') {
        return d > 5000 ? '#d7191c' :
            d > 3000 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'P_EDU') {
        return d > 1500 ? '#d7191c' :
            d > 1000 ? '#fdae61' :
                d > 500 ? '#f4f466' :
                    d > 200 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'DIF_M_H') {
        return d > 2 ? '#fdae61' :
            d > 1.84 ? '#f4f466' :
                d > 1.30 ? '#a6d96a' :
                    d > 0.9? '#1a9641' :
                    '#d7191c';
    }
    else if (currentStyle === 'P_EP') {
        return d > 800 ? '#d7191c' :
            d > 500 ? '#fdae61' :
                d > 300 ? '#f4f466' :
                    d > 100 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'M2_ESP_PU') {
        return d > 15 ? '#1a9641' :
            d > 10 ? '#a6d96a' :
                d > 8 ? '#f4f466' :
                    d > 3 ? '#fdae61':
                    '#d7191c';
    }
    else if (currentStyle === 'P_COMSER') {
        return d > 1000 ? '#d7191c' :
            d > 500 ? '#fdae61' :
                d > 200 ? '#f4f466' :
                    d > 50 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'EMPLEO') {
        return d > 58 ? '#1a9641' :
            d > 49 ? '#a6d96a' :
                d > 41 ? '#f4f466' :
                    d > 28 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'DESEM_M_H') {
        return d > 3.14 ? '#fdae61' :
            d > 1.62 ? '#f4f466' :
                d > 1 ? '#a6d96a' :
                    d > 0.89 ? '#1a9641' :
                    '#d7191c';
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
