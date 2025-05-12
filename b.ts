import scdl from "soundcloud-downloader"
import * as fs from 'node:fs'
import path from "node:path"
scdl
  .downloadPlaylist("https://soundcloud.com/pedro-rossi-836277316/sets/top-do-top?si=d607b1f83a104ca7b9ec915d4ba2a53d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing")
  .then(([streams, trackNames]) => {
    streams.forEach((val, idx) => {
      //@ts-expect-error

      val.pipe(fs.createWriteStream(path.join('./pedro', idx + '.mp3')))
      console.log('donwloaded: ', trackNames[idx])
    })
  })