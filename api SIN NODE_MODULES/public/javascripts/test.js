var classNames = [];
var model;

load_model();
/*
load the class names 
*/
async function loadDict() {
    loc = '/class_names.txt'
    await $.ajax({
        url: loc,
        dataType: 'text',
    }).done(success);
}

/*
load the class names
*/
function success(data) {
    const lst = data.split(/\n/)
    for (var i = 0; i < lst.length - 1; i++) {
        let symbol = lst[i]
        classNames[i] = symbol 
    }
}
/*
get the the class names 
*/
function getClassNames(indices) {
    var outp = []
    for (var i = 0; i < indices.length; i++)
        outp[i] = classNames[indices[i]]
    console.log(outp)	
    return outp
}

function findTopValues(inp, count) {
    var outp = [];
    let indices = findIndicesOfMax(inp, count)
    // show  scores
    for (var i = 0; i < indices.length; i++)
        outp[i] = inp[indices[i]]
    return outp
}

function findIndicesOfMax(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i);
        if (outp.length > count) {
            outp.sort(function(a, b) {
                return inp[b] - inp[a];
            });
            outp.pop();
        }
    }
    return outp;
}
function preprocess(img)
{
    let tensor = tf.browser.fromPixels(img)
    const resized = tf.image.resizeBilinear(tensor, [240, 320]).toFloat()
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    const batched = normalized.expandDims(0)
    return batched

}
/*
get the prediction 
*/
function predict(imgData) {
        
        var pred = model.predict(preprocess(imgData)).dataSync()

        console.log(pred)            

        const idx = tf.argMax(pred);
                
        //encontrando indices
        var indices = findIndicesOfMax(pred, 1)
        console.log(indices)
        var probs = findTopValues(pred, 1)
        var names = getClassNames(indices) 

        //set the table 
        //setTable(names, probs) 
        document.getElementById("Result").innerHTML = names
        document.getElementById("Probability").innerHTML = probs*100
	    console.log(names);
        console.log(document.getElementById("Result"));
    
  }

async function load_model(){
    var status = document.getElementById('status')
    status.style.opacity = "1";
    model = await tf.loadLayersModel('./tfjs2/model.json',strict=false)
    status.innerHTML = 'Modelo cargado'
}

async function start(){
    img = document.getElementById('foto');
    await loadDict()
    predict(img)       
}
   

					

					  
