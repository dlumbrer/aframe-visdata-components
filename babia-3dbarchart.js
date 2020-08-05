/* global AFRAME */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

/**
* A-Charts component for A-Frame.
*/
AFRAME.registerComponent('babia-3dbarchart', {
    schema: {
        data: { type: 'string' },
        legend: { type: 'boolean' },
        axis: { type: 'boolean', default: true },
        animation: {type: 'boolean', default: false},
        palette: {type: 'string', default: 'ubuntu'},
        title: {type: 'string'},
        titleFont: {type: 'string'},
        titleColor: {type: 'string'},
        titlePosition: {type: 'string', default: "0 0 0"},
        scale: {type: 'number'},
        heightMax: {type: 'number'}
    },

    /**
    * Set if component needs multiple instancing.
    */
    multiple: false,

    /**
    * Called once when component is attached. Generally for initial setup.
    */
    init: function () {
        let el = this.el;
        let metrics = ['height', 'x_axis', 'z_axis'];
        el.setAttribute('babiaToRepresent', metrics);
    },

    /**
    * Called when component is attached and when component data changes.
    * Generally modifies the entity based on the data.
    */

    update: function (oldData) {
        let data = this.data;
        let el = this.el;

        /**
         * Update or create chart component
         */
        if (data.data !== oldData.data) {
            //remove previous chart
            while (this.el.firstChild)
                this.el.firstChild.remove();
            console.log("Generating barchart...")
            generateBarChart(data, el)
        }
    },
    /**
    * Called when a component is removed (e.g., via removeAttribute).
    * Generally undoes all modifications to the entity.
    */
    remove: function () { },

    /**
    * Called on each scene tick.
    */
    // tick: function (t) { },

    /**
    * Called when entity pauses.
    * Use to stop or remove any dynamic or background behavior such as events.
    */
    pause: function () { },

    /**
    * Called when entity resumes.
    * Use to continue or add any dynamic or background behavior such as events.
    */
    play: function () { },

})

let generateBarChart = (data, element) => {
    if (data.data) {
        const dataToPrint = JSON.parse(data.data)
        const palette = data.palette
        const title = data.title
        const font = data.titleFont
        const color = data.titleColor
        const title_position = data.titlePosition
        const scale = data.scale
        const heightMax = data.heightMax

        let colorid = 0
        let maxColorId = 0
        let stepX = 0
        let maxX = 0
        let keys_used = {}
        let stepZ = 0
        let maxZ = 0
        let z_axis = {}
        let xaxis_dict = []
        let zaxis_dict = []
        let animation = data.animation

        let maxY = Math.max.apply(Math, dataToPrint.map(function (o) { return o.size; }))
        if (scale) {
            maxY = maxY / scale
        } else if (heightMax){
            valueMax = maxY
            proportion = heightMax / maxY
            maxY = heightMax
        }

        let chart_entity = document.createElement('a-entity');
        chart_entity.classList.add('babiaxrChart')

        element.appendChild(chart_entity)

        for (let bar of dataToPrint) {
            // Check if used in order to put the bar in the parent row
            if (keys_used[bar['key']]) {
                stepX = keys_used[bar['key']].posX
                colorid = keys_used[bar['key']].colorid
            } else {
                stepX = maxX
                colorid = maxColorId
                //Save in used
                keys_used[bar['key']] = {
                    "posX": maxX,
                    "colorid": maxColorId
                }

                //Axis dict
                let bar_printed = {
                    colorid: colorid,
                    posX: stepX,
                    key: bar['key']
                }
                xaxis_dict.push(bar_printed)

                maxX += widthBars + widthBars / 4
                maxColorId++
            }

            // Get Z val
            if (z_axis[bar['key2']]) {
                stepZ = z_axis[bar['key2']].posZ
            } else {
                stepZ = maxZ
                //Save in used
                z_axis[bar['key2']] = {
                    "posZ": maxZ
                }

                //Axis dict
                let bar_printed = {
                    colorid: colorid,
                    posZ: stepZ,
                    key: bar['key2']
                }
                zaxis_dict.push(bar_printed)

                maxZ += widthBars + widthBars / 4
            }

            let barEntity = generateBar(bar['size'], widthBars, colorid, stepX, stepZ, palette, animation, scale);

            //Prepare legend
            if (data.legend) {
                showLegend(barEntity, bar, element)
            }

            chart_entity.appendChild(barEntity);

            //Print Title
            let title_3d = showTitle(title, font, color, title_position);
            element.appendChild(title_3d);

        }

        // Axis
        if (data.axis) {
            showXAxis(element, maxX, xaxis_dict, palette)
            showZAxis(element, maxZ, zaxis_dict, palette)
            showYAxis(element, maxY, scale)
        }
    }
}

let widthBars = 1
let proportion
let valueMax

function generateBar(size, width, colorid, positionX, positionZ, palette, animation, scale) {
    let color = getColor(colorid, palette)
    console.log("Generating bar...")
    if (scale) {
        size = size / scale
    } else if (proportion){
        size = proportion * size
    }

    let entity = document.createElement('a-box');
    entity.setAttribute('color', color);
    entity.setAttribute('width', width);
    entity.setAttribute('depth', width);
    // Add animation
    if (animation){
        var duration = 4000
        var increment = 10 * size / duration 
        var height = 0
        var id = setInterval(animation, 10);
        function animation() {
            if (height >= size) {
                clearInterval(id);
            } else {
                height += increment;
                entity.setAttribute('height', height);
                entity.setAttribute('position', { x: positionX, y: height / 2, z: positionZ }); 
            }  
        }
    } else {
        entity.setAttribute('height', size);
        entity.setAttribute('position', { x: positionX, y: size / 2, z: positionZ });
    }
    return entity;
}

function getColor(colorid, palette){
    let color
    for (let i in colors){
        if(colors[i][palette]){
            color = colors[i][palette][colorid%4]
        }
    }
    return color
}

function generateLegend(bar, barEntity) {
    let text = bar['key'] + ': ' + bar['size'];

    let width = 2;
    if (text.length > 16)
        width = text.length / 8;

    let barPosition = barEntity.getAttribute('position')
    let entity = document.createElement('a-plane');
    entity.setAttribute('position', { x: barPosition.x, y: 2 * barPosition.y + 1, z: barPosition.z + widthBars + 0.1 });
    entity.setAttribute('rotation', { x: 0, y: 0, z: 0 });
    entity.setAttribute('height', '1');
    entity.setAttribute('width', width);
    entity.setAttribute('color', 'white');
    entity.setAttribute('text', {
        'value': text,
        'align': 'center',
        'width': 6,
        'color': 'black'
    });
    entity.classList.add("babiaxrLegend")
    return entity;
}

function showLegend(barEntity, bar, element) {
    barEntity.addEventListener('mouseenter', function () {
        this.setAttribute('scale', { x: 1.1, y: 1.1, z: 1.1 });
        legend = generateLegend(bar, barEntity);
        element.appendChild(legend);
    });

    barEntity.addEventListener('mouseleave', function () {
        this.setAttribute('scale', { x: 1, y: 1, z: 1 });
        element.removeChild(legend);
    });
}


function showXAxis(parent, xEnd, bars_printed, palette) {
    let axis = document.createElement('a-entity');
    //Print line
    let axis_line = document.createElement('a-entity');
    axis_line.setAttribute('line__xaxis', {
        'start': { x: -widthBars, y: 0, z: 0 },
        'end': { x: xEnd, y: 0, z: 0 },
        'color': '#ffffff'
    });
    axis_line.setAttribute('position', { x: 0, y: 0, z: -(widthBars / 2 + widthBars / 4) });
    axis.appendChild(axis_line)

    //Print keys
    bars_printed.forEach(e => {
        let color = getColor(e.colorid, palette)
        let key = document.createElement('a-entity');
        key.setAttribute('text', {
            'value': e.key,
            'align': 'left',
            'width': 10,
            'color': color
        });
        key.setAttribute('position', { x: e.posX, y: 0, z: -widthBars-5 })
        key.setAttribute('rotation', { x: -90, y: 90, z: 0 });
        axis.appendChild(key)
    });

    //axis completion
    parent.appendChild(axis)
}

function showZAxis(parent, zEnd, bars_printed, palette) {
    let axis = document.createElement('a-entity');
    //Print line
    let axis_line = document.createElement('a-entity');
    axis_line.setAttribute('line__xaxis', {
        'start': { x: 0, y: 0, z: -(widthBars / 2 + widthBars / 4) },
        'end': { x: 0, y: 0, z: zEnd },
        'color': '#ffffff'
    });
    axis_line.setAttribute('position', { x: -widthBars, y: 0, z: 0 });
    axis.appendChild(axis_line)

    //Print keys
    bars_printed.forEach(e => {
        let key = document.createElement('a-entity');
        let color = getColor(e.colorid, palette)
        key.setAttribute('text', {
            'value': e.key,
            'align': 'right',
            'width': 10,
            'color': color
        });
        key.setAttribute('position', { x: -widthBars-5.2, y: 0, z: e.posZ })
        key.setAttribute('rotation', { x: -90, y: 0, z: 0 });
        axis.appendChild(key)
    });

    //axis completion
    parent.appendChild(axis)
}


function showYAxis(parent, yEnd, scale) {
    let axis = document.createElement('a-entity');
    let yLimit = yEnd
    //Print line
    let axis_line = document.createElement('a-entity');
    axis_line.setAttribute('line__yaxis', {
        'start': { x: -widthBars, y: 0, z: 0 },
        'end': { x: -widthBars, y: yEnd, z: 0 },
        'color': '#ffffff'
    });
    axis_line.setAttribute('position', { x: 0, y: 0, z: -(widthBars / 2 + widthBars / 4) });
    axis.appendChild(axis_line)

    if (proportion){
        yLimit = yLimit / proportion
        var mod = Math.floor(Math.log10(valueMax))
    }   
    for (let i = 0; i<=yLimit; i++){
        let key = document.createElement('a-entity');
        let value = i
        let pow = Math.pow(10, mod-1)
        if (!proportion || (proportion && i%pow === 0)){  
            key.setAttribute('text', {
                'value': value,
                'align': 'right',
                'width': 10,
                'color': 'white '
            });
            if (scale){
                key.setAttribute('text', {'value': value * scale})
                key.setAttribute('position', { x: -widthBars-5.2, y: value, z: -(widthBars / 2 + widthBars / 4) })
            } else {
                key.setAttribute('position', { x: -widthBars-5.2, y: i * proportion, z: -(widthBars / 2 + widthBars / 4) })
            }     
        }
        axis.appendChild(key)
    }

    //axis completion
    parent.appendChild(axis)
}

function showTitle(title, font, color, position){
    let entity = document.createElement('a-entity');
    entity.setAttribute('text-geometry',{
        value : title,
    });
    if (font){
        entity.setAttribute('text-geometry', {
            font: font,
        })
    }
    if (color){
        entity.setAttribute('material' ,{
            color : color
        })
    }
    var position = position.split(" ") 
    entity.setAttribute('position', {x: position[0], y: position[1], z: position[2]})
    entity.setAttribute('rotation', {x: 0, y: 0, z: 0})
    entity.classList.add("babiaxrTitle")
    return entity;
}

let colors = [
    {"blues": ["#142850", "#27496d", "#00909e", "#dae1e7"]},
    {"foxy": ["#f79071", "#fa744f", "#16817a", "#024249"]},
    {"flat": ["#120136", "#035aa6", "#40bad5", "#fcbf1e"]},
    {"sunset": ["#202040", "#543864", "#ff6363", "#ffbd69"]},
    {"bussiness": ["#de7119", "#dee3e2", "#116979", "#18b0b0"]},
    {"icecream": ["#f76a8c", "#f8dc88", "#f8fab8", "#ccf0e1"]},
    {"ubuntu": ["#511845", "#900c3f", "#c70039", "#ff5733"]},
    {"pearl": ["#efa8e4", "#f8e1f4", "#fff0f5", "#97e5ef"]},
    {"commerce": ["#222831", "#30475e", "#f2a365", "#ececec"]},
]