prediction_1=""
prediction_2=""
Webcam.set({
width:350,
height:300,
image_format: 'png',
png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot()
{
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML=innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
});
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nq3YGLBXU/model.json',modelLoaded);
function modelLoaded()
{
console.log('modelLoaded');
}
function speak()
{
var synth=window.speechSynthesis;
speak_data_1="1st predicton is"+prediction_1;
speak_data_2="2nd predicton is"+prediction_2;
var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterThis);
utterThis.rate=0.5
}
function check()
{
img=document.getElementById('captured_image');
classifier.classify(img, got_result);

}
function got_result(error,results)
{
if(error)
{
console.error(error);
}
else{
console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
prediction_1=results[0].label
prediction_2=results[1].label
speak();
if(results[0].label=="happy"){
    document.getElementById("update_emoji").innerHTML="&#128075;";
    }
    if(results[0].label=="sad"){
        document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="&#9994;";
            }
    if(results[0].label=="normal"){
        document.getElementById("update_emoji").innerHTML="&#9995;";
        }
        if(results[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128075;";
            }
            if(results[1].label=="sad"){
                document.getElementById("update_emoji2").innerHTML="&#128076;";
                }
                if(results[1].label=="angry"){
                    document.getElementById("update_emoji2").innerHTML="&#9994;";
                    }
            if(results[1].label=="normal"){
                document.getElementById("update_emoji2").innerHTML="&#9995;";
                }
}
}