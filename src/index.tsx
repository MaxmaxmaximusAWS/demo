import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'

ReactDOM.render(<App />, document.getElementById('root'))


// import * as THREE from 'three'
//
// var camera, scene, renderer;
// var geometry, material, mesh;
//
// init();
// animate();
//
// function init() {
//
//   camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
//   camera.position.z = 1;
//
//   scene = new THREE.World();
//
//   geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
//   // @ts-ignore
//   material = new THREE.MeshBasicMaterial( { vertexColors: true } );
//
//   setTimeout( () => {
//
//     var faces = geometry.faces;
//
//     for ( var face of faces ) {
//
//       face.color.set( Math.random() * 0xffffff );
//
//     }
//
//     geometry.colorsNeedUpdate = true;
//
//   }, 2000 );
//
//   mesh = new THREE.Mesh( geometry, material );
//   scene.add( mesh );
//
//   renderer = new THREE.WebGLRenderer( { antialias: true } );
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   document.body.appendChild( renderer.domElement );
//
// }
//
// function animate() {
//
//   requestAnimationFrame( animate );
//
//   mesh.rotation.x += 0.01;
//   mesh.rotation.y += 0.02;
//
//   renderer.render( scene, camera );
//
// }