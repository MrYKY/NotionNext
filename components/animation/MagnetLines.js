import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = 500, // 用于设置场景大小(像素)
  lineColor = 0xefefef,
  lineWidth = 10,
  lineHeight = 50,
  baseAngle = -10,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // =============== 1. 初始化 场景/相机/渲染器 ===============
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // 创建透视相机(PerspectiveCamera)或正交相机(OrthographicCamera)
    // 这里用 透视相机 作为示例
    const camera = new THREE.PerspectiveCamera(
      45,                    // fov
      1,                     // aspect (先写 1，后面会在 resize 时更新)
      0.1,                   // near
      10000                  // far
    );
    // 把相机放远一点，让网格整体可见
    camera.position.set(0, 0, 1000);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerSize, containerSize);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    // 将渲染器挂载到页面
    containerRef.current.appendChild(renderer.domElement);

    // =============== 2. 创建 网格中的条状Mesh ===============
    const lines = [];
    // 计算网格总尺寸，以便让它居中在 (0,0) 附近
    const gridWidth = columns * lineWidth * 2;  // 这里简单估算：lineWidth*2 作为每格的「单元大小」
    const gridHeight = rows * lineHeight * 1.2; // 同理，这里给个大约数做间距

    // 为所有网格单元创建一个单独的 Mesh
    // 这里用 PlaneGeometry 或 BoxGeometry 表示线条
    const geometry = new THREE.BoxGeometry(lineWidth, lineHeight, 1);
    const material = new THREE.MeshBasicMaterial({ color: lineColor });

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const mesh = new THREE.Mesh(geometry, material.clone());
        
        // 计算这个格子在网格中的 x/y 位置，让网格整体居中
        const x = c * lineWidth * 2 - gridWidth / 2 + lineWidth;
        const y = r * lineHeight * 1.2 - gridHeight / 2 + lineHeight / 2;

        // mesh 初始位置 & 旋转
        mesh.position.set(x, y, 0);
        mesh.rotation.z = THREE.MathUtils.degToRad(baseAngle);

        scene.add(mesh);
        lines.push(mesh);
      }
    }

    // =============== 3. 监听鼠标移动，更新旋转 ===============
    //   这里鼠标坐标是 [clientX, clientY]，需要转换成三维世界坐标
    //   简单做法：用 unproject + Raycaster 或者仅做2D平面映射
    function onPointerMove(e) {
      // 获取canvas的边界，用于把屏幕坐标转换到-1 ~ 1的范围
      const rect = renderer.domElement.getBoundingClientRect();
      const mouseX = ( (e.clientX - rect.left) / rect.width ) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height ) * 2 + 1;

      // 把(-1~1)的NDC坐标映射为世界坐标
      // 首先创建一个向量
      const vector = new THREE.Vector3(mouseX, mouseY, 0);
      // 把它从 "裁剪空间" 转换到 "世界空间"
      vector.unproject(camera);

      // 计算每个line相对鼠标的角度
      lines.forEach((mesh) => {
        const dx = vector.x - mesh.position.x;
        const dy = vector.y - mesh.position.y;
        const angle = Math.atan2(dy, dx); // 范围 -π~π
        // 三.js 的 2D 旋转在 z 轴上
        mesh.rotation.z = -(angle); // 如果想指向鼠标，需要-号或再调试
      });
    }

    // 绑定事件
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    // =============== 4. 动画循环 ===============
    let stopAnimation = false;
    const animate = () => {
      if (stopAnimation) return;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // =============== 5. 处理销毁 ===============
    return () => {
      stopAnimation = true;
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      // 释放 Three.js 资源
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      // 移除 dom
      containerRef.current.removeChild(renderer.domElement);
    };
  }, [rows, columns, containerSize, lineColor, lineWidth, lineHeight, baseAngle]);

  return (
    <div 
      ref={containerRef} 
      style={{ width: containerSize, height: containerSize, overflow: 'hidden' }}
    />
  );
}
