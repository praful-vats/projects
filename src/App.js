import * as THREE from 'three'
import Img2c from './Img2c.jpg';
import Img3c from './Img3c.jpg';
import Img4c from './Img4c.jpg';
import Img5c from './Img5c.jpg';
import Img6c from './Img6c.jpg';
import trip2c from './trip2c.jpg';
import Img0c from './Img0.jpg';

import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload, Image as ImageImpl } from '@react-three/drei'
import { ScrollControls, Scroll, useScroll } from './ScrollControls.tsx';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function Image(props) {
  const ref = useRef()
  const group = useRef()
  const data = useScroll()
  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, Math.max(0, 1 - data.delta * 1000), 4, delta)
  })
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  )
}

function Page({ m = 0.4, urls, ...props }) {
  const { width } = useThree((state) => state.viewport)
  const w = width < 100 ? 1.5 / 3 : 1 / 3
  return (
    <group {...props}>
      <Image position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]} url={urls[0]} />
      <Image position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]} url={urls[1]} />
      <Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={urls[2]} />
    </group>
  )
}

function Pages() {
  const { width } = useThree((state) => state.viewport)
  return (
    <>
      <Page position={[-width * 1, 0, 0]} urls={[Img4c, Img6c, trip2c]} />
      <Page position={[width * 0, 0, 0]} urls={[Img4c, Img0c, Img3c]} />
      <Page position={[width * 1, 0, 0]} urls={[Img4c, Img2c, Img5c]} />
      <Page position={[width * 2, 0, 0]} urls={[Img4c, Img6c, trip2c]} />
      <Page position={[width * 3, 0, 0]} urls={[Img4c, Img0c, Img3c]} />
      <Page position={[width * 4, 0, 0]} urls={[Img4c, Img2c, Img5c]} />
    </>
  )
}

export default function App() {
  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
            <Scroll>
              <Pages />
            </Scroll>
            <Scroll html>
              {/* <h1 className='font1' style={{ position: 'absolute', top: '-16vh', left: '25vw' }}>generative adversarial networks</h1>
              <h1 className='font1' style={{ position: 'absolute', top: '-16vh', left: '125vw' }}>ml5.js &nbsp;x&nbsp; p5.js &nbsp;x&nbsp; three.js</h1>
              <h1 className='font1' style={{ position: 'absolute', top: '-16vh', left: '275vw' }}>python x react</h1> */}
              <a className='fonts' href="http://dalal-street.online/" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: '50vh', left: '40vw' }}>dalal street&#x1F86D;</a>
              <a className='fonts' href="https://praful-vats.github.io/xyle/" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: '50vh', left: '84vw' }}>xyle&#x1F86D;</a>
              <a className='fonts' href="https://praful-vats.github.io/xense/" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: '50vh', left: '140vw' }}>xense&#x1F86D;</a>
              <a className='fonts' href="https://praful-vats.github.io/ml5/" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: '50vh', left: '190vw' }}>ml5&#x1F86D;</a>
              <a className='fonts' href="https://praful-vats.github.io/zero_one/" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: '50vh', left: '240vw' }}>zero& one&#x1F86D;</a>
              <a className='fonts' href="https://praful-vats.github.io/click/" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: '50vh', left: '287vw' }}>click&#x1F86D;</a>
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </>
  )
}
