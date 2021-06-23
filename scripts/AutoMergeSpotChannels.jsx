// i always start my scripts defining document because it's more easy to see after in my code, feel free to use or define to run in all documents opened in ps
var document = app.activeDocument
var docChannels = document.channels

// erase any kind different from spot channels
for(i = docChannels.length - 1; i >= 0; i-- ) {
    if(docChannels[i].kind == "ChannelType.MASKEDAREA") {
        docChannels[i].remove()
    }
}

//after erasing alfa channels, or something diferent from spot channels, the array "document.channels" will be diferent, so I needed to worry about that
var newDocChannels = document.channels

//the for loops needed to be inverted due to the way the channels array are got by the script. Even jumping start from the main color channels that all images have,
//inittiating from the first spot channel, the array would change on the go. So, to bypass this problem, the same way the array shrinks itself when merging spot channels
//the loop count will count decrescent.
// Maybe a next thing to do is to add more cases to "document.mode", in the sense where I work we only use RGB or CMYK images, rarely Grayscale;

if(document.mode == "DocumentMode.RGB") {
    for (i = newDocChannels.length - 1; i >= 3; i--) {
        newDocChannels[i].merge()
    }
}

if(document.mode == "DocumentMode.CMYK") {
    for (i = newDocChannels.length - 1; i >= 4; i--) {
        newDocChannels[i].merge()
    }
}
