function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifer=ml5.imageClassifier("MobileNet",modelloaded)
}

function modelloaded(){
console.log("model loaded")
}

function draw(){
  image(video,0,0,300,300)
  classifer.classify(video,gotresult)
}

var previous_result="";

function gotresult(error,results){
if(error){
console.error(error)
}
else{
  if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
   console.log(results)
   previous_result=results[0].label
   syn=window.speechSynthesis
   speak_data="object detected is "+results[0].label
   var utterthis=new SpeechSynthesisUtterance(speak_data)
   syn.speak(utterthis)

   document.getElementById("object_name").innerHTML=results[0].label
   document.getElementById("accuracy").innerHTML=results[0].confidence.toFixed(3)
  }
}
}






