import {AudioListener, Audio} from 'three'
import state from '../state'
import loadAudio from '../util/load-audio'
import scene from '../world/scene'

const NUM_SONGS = 6
const buffers = new Map()
const listener = new AudioListener()
const sound = new Audio(listener)

let loaded = 0

scene.add(listener)

const onSongLoad = (file, buffer) => {
  buffers.set(file, buffer)
  loaded += 1

  if (loaded === NUM_SONGS && state.isMusicOn) play()
}

const play = () => {
  if (sound.isPlaying) sound.stop()

  if (state.isMusicOn) {
    const song = `${(Math.random() * NUM_SONGS + 1) | 0}.wav`

    sound.setBuffer(buffers.get(song))
    sound.play()
  }
}

const updateAudio = (playerZ) => {

}

export const toggleMusic = (on) => {
  if (on === true) play()
  else sound.stop()
}

for (let i = 0; i < NUM_SONGS; i++) {
  loadAudio(`${i + 1}.wav`, onSongLoad)
}

sound.onEnded = play
sound.setVolume(0.3)

export default updateAudio
