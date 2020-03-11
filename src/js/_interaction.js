import * as THREE from 'three'

export default class Interaction {
  constructor (param) {
    this.canvasId = param
    this.canvasW = window.innerWidth
    this.canvasH = window.innerHeight
    this.scrollY = 0
  }

  init () {
    console.log('Interaction')
    this.setRenderer()
    this.setEvent()
  }

  setRenderer () {
    // サイズを指定
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: document.getElementById(this.canvasId)
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // this.renderer.setClearColor(0xE5E0D9)
    this.renderer.setSize(this.canvasW, this.canvasH)

    // シーンを作成する
    this.scene = new THREE.Scene()

    // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
    const fov = 60
    const fovRad = (fov / 2) * (Math.PI / 180)// 視野角をラジアンに変換
    const dist = (this.canvasH / 2) / Math.tan(fovRad)// ウィンドウぴったりのカメラ距離

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new THREE.PerspectiveCamera(fov, this.canvasW / this.canvasH, 1, dist * 2)
    this.camera.position.z = dist// カメラを遠ざける

    // 平行光源を作成
    // new THREE.DirectionalLight(色, 光の強さ)
    const light = new THREE.DirectionalLight(0xFFEDD2, 1)
    light.position.set(2, 2, 2)
    this.scene.add(light)

    this.setMesh()
  }

  setMesh () {
    const _this = this
    this.meshList = []
    for (let i = 0; i < 10; i++) {
      this.meshList[i] = makeMesh()
    }
    function makeMesh () {
      const geo = new THREE.TorusGeometry(50, 30, 30, 50)
      const mat = new THREE.MeshToonMaterial({ color: 0xAD897C })
      const mesh = new THREE.Mesh(geo, mat)
      // Math.random() * ( 最大値 - 最小値 ) + 最小値;
      const x = Math.floor(Math.random() * ((_this.canvasW / 2) - (-_this.canvasW / 2)) + -_this.canvasW / 2)
      const y = Math.floor(Math.random() * (_this.canvasH / 2 - -_this.canvasH / 2) + -_this.canvasH / 2)
      mesh.position.set(x, y, 1)
      _this.scene.add(mesh)
      return mesh
    }

    this.renderer.render(this.scene, this.camera)
    // this.render()
  }

  render () {
    // 次のフレームを要求
    requestAnimationFrame(() => { this.render() })

    // ミリ秒から秒に変換
    const sec = performance.now() / 1000

    // 1秒で45°回転する
    for (let i = 0; i < this.meshList.length; i++) {
      this.meshList[i].rotation.x = sec * (Math.PI / 6)
      this.meshList[i].rotation.y = sec * (Math.PI / 6)
    }
    // 画面に表示
    this.renderer.render(this.scene, this.camera)
  }

  setEvent () {
    const _this = this
    this.currentScrollY = window.scrollY
    let prevScrollY = window.scrollY

    window.addEventListener('mousemove', e => {
      _this.mouseX = e.clientX - (this.canvasW / 2)
      _this.mouseY = e.clientY
    })

    window.addEventListener('scroll', e => {
      _this.currentScrollY = window.scrollY
      console.log(_this.currentScrollY)
      // スクロールに追従させる
      if (prevScrollY <= _this.currentScrollY || _this.currentScrollY === 0) {
        console.log('down')
        for (let i = 0; i < _this.meshList.length; i++) {
          _this.meshList[i].position.y += _this.currentScrollY * 0.01
          console.log(i, _this.meshList[i].position.y)
        }
      } else {
        console.log('up')
        for (let i = 0; i < _this.meshList.length; i++) {
          _this.meshList[i].position.y -= _this.currentScrollY * 0.01
        }
      }
      prevScrollY = _this.currentScrollY
      _this.renderer.render(_this.scene, _this.camera)
    })
  }
}
