import * as THREE from 'three'
import { TweenMax } from 'gsap'
export default class ImgEffect {
  constructor (param) {
    this.canvasId = param.id
    this.w = document.body.clientWidth
    this.h = document.body.clientHeight
    this.imgPath = param.path
    this.uniforms = {}
    this.texture = null
    this.mesh = null
  }

  /* ------------------------------
  // カメラ・レンダラー・ライトの作成
  ------------------------------ */
  init () {
    console.log('imgEffect')

    // シーン
    this.scene = new THREE.Scene()

    // レンダラー
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: document.getElementById(this.canvasId)
    })
    this.renderer.setClearColor(0xffffff, 1)
    this.renderer.setSize(this.w, this.h)
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)

    // カメラ
    this.camera = new THREE.PerspectiveCamera(50, this.w / this.h, 1, 1000)
    this.camera.position.set(0, 0, 10)

    // ライト
    var light = new THREE.AmbientLight(0xffffff)
    this.scene.add(light)

    this.createMesh(this.imgPath)
    this.render()
    this.setEventListner()
  }

  /* ------------------------------
  // メッシュを作成する
  ------------------------------ */
  createMesh (imgPath) {
    // 頂点シェーダーのソース
    const vertexSource = `
        varying vec2 vUv;

        void main(void) {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
    `

    // フラグメントシェーダ
    const fragmentSource = `
    varying vec2 vUv;

    #define PI 3.14159265359

    uniform vec2 resolution;
    uniform vec2 imageResolution;
    uniform sampler2D texture1; // メインの画像
    uniform sampler2D texture2; // エフェクト用の画像
    uniform float dispFactor;

    // uv座標を回転させる
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
                }


    void main(void) {
    // windowサイズいっぱいに広げたPlaneのテクスチャにbackground-size:coverのような挙動をさせる
    vec2 ratio = vec2(
        min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
        min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
      );
    vec2 uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );

    // エフェクト用の画像の色情報（rgbaのvec4の四次元配列）
    vec4 disp = texture2D(texture2, uv);

    // uv座標にこのrgba情報のうちdisp.rとdisp.gを掛け算
    vec2 calcPosition = uv + rotate2d(PI) * vec2(disp.r,disp.g) * (1.0 - dispFactor) * 0.1;

    vec4 _texture = texture2D(texture1, calcPosition);
    gl_FragColor = _texture;
    }
    `

    // 平面
    const geometry = new THREE.PlaneBufferGeometry(2, 2)
    // 画像を読み込む
    this.texture = new THREE.TextureLoader().load(imgPath)

    // uniform変数を定義
    this.uniforms = {
      resolution: { // 画面の解像度
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      },
      imageResolution: { // 背景画像の解像度
        type: 'v2',
        value: new THREE.Vector2(2560, 1440)
      },
      texture1: { // テクスチャの読み込み
        type: 't',
        value: this.texture
      },
      texture2: { // テクスチャの読み込み
        type: 't',
        value: new THREE.TextureLoader().load('/assets/img/effect.jpeg')
      },
      dispFactor: {
        type: 'f',
        value: 1
      }
    }

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      // シェーダーを割り当てる
      vertexShader: vertexSource,
      fragmentShader: fragmentSource,
      transparent: true
    })

    this.plane = new THREE.Mesh(geometry, material)
    this.scene.add(this.plane)
  }

  /* ------------------------------
  // レンダリング
  ------------------------------ */
  render () {
    const _this = this
    test()
    function test () {
      requestAnimationFrame(test)
      _this.renderer.render(_this.scene, _this.camera)
    }
  }

  /* ------------------------------
  // リサイズ時の処理
  ------------------------------ */
  resizeWindow () {
    this.w = document.body.clientWidth
    this.h = document.body.clientHeight
    const canvas = document.getElementById(this.canvasId)
    canvas.width = this.w
    canvas.height = this.h

    this.camera.aspect = this.w / this.h
    this.camera.updateProjectionMatrix()
    this.plane.material.uniforms.resolution.value.set(this.w, this.h)
    this.renderer.setSize(this.w, this.h)
  }

  /* ------------------------------
  // イベントハンドラー
  ------------------------------ */
  setEventListner () {
    const self = this
    const canvas = document.getElementById(this.canvasId)
    window.addEventListener('resize', function () {
      self.resizeWindow()
      console.log('resize')
    })
    canvas.addEventListener('mouseenter', function () {
      console.log('mouseenter')
      TweenMax.to(self.uniforms.dispFactor, 1, {
        value: 0.8
      })
    })
    canvas.addEventListener('mouseleave', function () {
      TweenMax.to(self.uniforms.dispFactor, 1.5, {
        value: 1
      })
    })
  }
}
