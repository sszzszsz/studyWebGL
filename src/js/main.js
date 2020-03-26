import '../scss/style.scss'
import Mesh from './_mesh'
import Interaction from './_interaction'
import ImgEffect from './_imgEffect'
// import GridToFullscreenEffect from './WebGLDistortionConfigurator/_GridToFullscreenEffect'

import '../img/effect.jpeg'
import '../img/test.jpg'

window.addEventListener('load', init)

function init () {
  const demo1Falg = document.getElementById('demo1')
  if (demo1Falg !== null) {
    const demo1 = new Mesh('canvas1')
    demo1.MeshBasicMaterial()

    const demo2 = new Mesh('canvas2')
    demo2.MeshNormalMaterial()

    const demo3 = new Mesh('canvas3')
    demo3.MeshLambertMaterial()

    const demo4 = new Mesh('canvas4')
    demo4.MeshPhongMaterial()

    const demo5 = new Mesh('canvas5')
    demo5.MeshToonMaterial()

    const demo6 = new Mesh('canvas6')
    demo6.MeshStandardMaterial()
  }

  const demo2Falg = document.getElementById('demo2')
  if (demo2Falg !== null) {
    const itr1 = new Interaction('canvas1')
    itr1.init()
  }

  if (document.getElementById('demo3') !== null) {
    const img01 = new ImgEffect({
      id: 'canvas3',
      path: '../img/test.jpg'
    })
    img01.init()
  }

  if (document.getElementById('demo4') !== null) {
    // console.log(GridToFullscreenEffect)
    // const transitionEffect = new GridToFullscreenEffect(
    //   document.getElementById('app'),
    //   document.getElementById('itemsWrapper'),
    //   {
    //     duration: 1.5,
    //     timing: { type: 'sameEnd', props: { latestStart: 0.25 } },
    //     activation: { type: 'radial', props: { rows: 4 } },
    //     transformation: { type: 'circle' },
    //     easings: { toFullscreen: Quint.easeOut, toGrid: Quint.easeOut }
    //   }
    // )
    // transitionEffect.init()
  }
}
