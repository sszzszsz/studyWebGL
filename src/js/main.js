import '../scss/style.scss'
import Mesh from './_mesh'
import Interaction from './_interaction'
import ImgEffect from './_imgEffect'
import GridToFullscreenEffect from './WebGLDistortionConfigurator/_GridToFullscreenEffect'

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
      path: '/assets/img/test.jpg'
    })
    img01.init()
  }

  if (document.getElementById('demo4') !== null) {
    console.log('demo4')
    // インスタンス生成
    const transitionEffect = new GridToFullscreenEffect(
      document.getElementById('app'),
      document.getElementById('itemsWrapper'),
      {
        duration: 1,
        timing: { type: 'sections', props: { latestStart: 0 } },
        activation: { type: 'radial', props: { onMouse: false } },
        transformation: {
          type: 'fluid',
          props: { amplitude: 2, frequency: 1.6, progressLimit: 0.1 }
        },
        randomizeSeed: 'tweenUnique',
        easings: { toFullscreen: 'Strong.easeOut', toGrid: 'Strong.easeOut' }
      }
    )

    // 写真を配列にしてテクスチャ生成
    const images = []
    for (let i = 0, imageSet = {}; i < document.querySelectorAll('img').length; i++) {
      const image = {
        element: document.querySelectorAll('img')[i],
        image: document.querySelectorAll('img')[i]
      }
      if (i % 2 === 0) {
        imageSet = {}
        imageSet.small = image
      }
      if (i % 2 === 1) {
        imageSet.large = image
        images.push(imageSet)
      }
    }

    transitionEffect.createTextures(images)
    transitionEffect.init()

    // クリックしたらフルサイズにするか判定し実行
    const targetImg = document.querySelectorAll('.item img.sumb')
    const canvasWrap = document.getElementById('canvasCont')

    for (let i = 0; i < targetImg.length; i++) {
      const target = targetImg[i]
      target.addEventListener('click', function () {
        console.log('click')
        if (transitionEffect.isFullscreen) {
          transitionEffect.toGrid()
        }
      })
    }

    canvasWrap.addEventListener('click', function () {
      console.log('click')
      if (transitionEffect.isFullscreen) {
        transitionEffect.toGrid()
      }
    })
  }
}
