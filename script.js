navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;
                         
// navigator.mozGetUserMedia has been replaced by navigator.mediaDevices.getUserMedia

let bindEvent=(p)=>{
    p.on('error',(err)=>{
        console.log('Error', err);
    })
    p.on('signal', (data)=>{
        document.querySelector('#offer').textContent = JSON.stringify(data);
    })
    p.on('stream', (stream)=>{
        let video = document.querySelector('#receiver-video')
        video.volume= 0
        // debugger
        video.srcObject=stream;
        video.play()

    })
    document.querySelector('#incoming').addEventListener('submit', (e)=>{
        e.preventDefault()
    
        p.signal(JSON.parse(e.target.querySelector('textarea').value))
    
    })

}


let startPeer= (initiator)=>{

    navigator.getUserMedia({
        video: true,
        audio: true
    }, (stream)=>{
            let p = new SimplePeer({
            initiator: initiator,
            stream: stream,
            trickle: false
        })
        bindEvent(p);
        let emitterVideo= document.querySelector('#emitter-video')

        
        emitterVideo.volume= 0
        // debugger
        emitterVideo.srcObject=stream;
        emitterVideo.play()

    }, ()=>{

    })


}

document.querySelector('#start').addEventListener('click', ()=>{
    startPeer(true)
    
})

document.querySelector('#receive').addEventListener('click', ()=>{
    startPeer(false);
    
})


