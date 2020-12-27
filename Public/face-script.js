const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./face-api-models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./face-api-models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./face-api-models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./face-api-models')
]).then(startCamera());

function startCamera(){
    navigator.getUserMedia(
        {
        video : {}   
        }, 
        stream => (video.srcObject = stream), 
        err => console.log(err)
    );
}


video.addEventListener("play",() =>{
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const BoxSize = {
        width : video.width,
        height : video.height
    };
    faceapi.matchDimensions(canvas,BoxSize)

   const timer = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
        const resizedDetections = faceapi.resizeResults(detections,BoxSize);
        faceapi.draw.drawDetections(canvas,resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas,resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas,resizedDetections);
        console.log('HAPPY: ', detections[0].expressions.happy);

        // window.location.href="http://localhost/FaceRecognition/?result="+detections[0].expressions.happy
        // clearInterval(timer);
    }, 1000)
    
    
});







