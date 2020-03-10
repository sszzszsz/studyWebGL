import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Mesh {
  constructor (param) {
    this.canvasId = param
    this.canvasW = 300
    this.canvasH = 300
  }

  init () {
    // サイズを指定
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.getElementById(this.canvasId)
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xE5E0D9)
    this.renderer.setSize(this.canvasW, this.canvasH)

    // シーンを作成する
    this.scene = new THREE.Scene()

    // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
    this.camera = new THREE.PerspectiveCamera(45, this.canvasW / this.canvasH, 1, 2000)
    this.camera.position.set(0, 0, +500)

    // カメラコントローラーを作成
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // 滑らかにカメラコントローラーを制御する
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.2
    // 平行光源を作成
    // new THREE.DirectionalLight(色, 光の強さ)
    const light = new THREE.DirectionalLight(0xFFEDD2, 1)
    light.position.z = 250
    this.scene.add(light)
    var helper = new THREE.DirectionalLightHelper(light, 10)
    this.scene.add(helper)
  }

  MeshBasicMaterial () {
    this.init()
    // new THREE.BoxGeometry(幅, 高さ, 奥行き)
    const geometry = new THREE.TorusGeometry(100, 40, 160, 100)
    // new THREE.MeshBasicMaterial(幅, 高さ, 奥行き)
    const material = new THREE.MeshBasicMaterial({ color: 0xAD897C })
    // new THREE.Mesh(ジオメトリ,マテリアル)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = 0
    mesh.rotation.x = 0
    // シーンに追加
    this.scene.add(mesh)
    this.renderer.render(this.scene, this.camera)
    this.tick()
  }

  MeshNormalMaterial () {
    this.init()

    const geometry = new THREE.TorusGeometry(100, 40, 160, 100)
    // new THREE.MeshNormalMaterial()
    const material = new THREE.MeshNormalMaterial({ color: 0xAD897C })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = 0
    mesh.rotation.x = 0
    this.scene.add(mesh)
    this.renderer.render(this.scene, this.camera)
    this.tick()
  }

  MeshLambertMaterial () {
    this.init()

    const geometry = new THREE.TorusGeometry(100, 40, 160, 100)
    // new THREE.MeshLambertMaterial()
    const material = new THREE.MeshLambertMaterial({ color: 0xAD897C })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = 0
    mesh.rotation.x = 0
    this.scene.add(mesh)
    this.renderer.render(this.scene, this.camera)
    this.tick()
  }

  MeshPhongMaterial () {
    this.init()

    const geometry = new THREE.TorusGeometry(100, 40, 160, 100)
    // new THREE.MeshPhongMaterial()
    const material = new THREE.MeshPhongMaterial({ color: 0xAD897C })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = 0
    mesh.rotation.x = 0
    this.scene.add(mesh)
    this.renderer.render(this.scene, this.camera)
    this.tick()
  }

  MeshToonMaterial () {
    this.init()

    const geometry = new THREE.TorusGeometry(100, 40, 160, 100)
    // new THREE.MeshToonMaterial()
    const material = new THREE.MeshToonMaterial({ color: 0xAD897C })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = 0
    mesh.rotation.x = 0
    this.scene.add(mesh)
    this.renderer.render(this.scene, this.camera)
    this.tick()
  }

  MeshStandardMaterial () {
    this.init()

    const geometry = new THREE.TorusGeometry(100, 40, 160, 100)
    // new THREE.MeshStandardMaterial()
    const material = new THREE.MeshStandardMaterial({ color: 0xAD897C, roughness: 0 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = 0
    mesh.rotation.x = 0
    this.scene.add(mesh)
    this.renderer.render(this.scene, this.camera)
    this.tick()
  }

  tick () {
    const _this = this
    test()
    function test () {
      // カメラコントローラーを更新
      _this.controls.update()
      // レンダリング
      _this.renderer.render(_this.scene, _this.camera)
      requestAnimationFrame(test)
    }
  }
}
