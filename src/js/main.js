import Mesh from './_mesh'

window.addEventListener('load', init)
function init () {
  const demo1Falg = document.getElementById('canvas2')
  if (typeof demo1Falg !== 'undefined') {
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
}
