import { bootstrapCameraKit } from '@snap/camera-kit';

(async function () {
  let isFrontFacing = true; // Initially assuming the front camera is active
  const cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzEzODAzNTY4LCJzdWIiOiIwZjBjYWY5Mi1hYjMyLTQyZWEtYjgwZC05ZDQ5N2VlOTYwMTV-U1RBR0lOR35kOTBiZGJkMS03MzU0LTRjNTYtYTYwMi1jMGEyMjJlNmJmYmYifQ.uDZfZL0qjbTggO8K1KWGLmIgYSc_n9A6fgC5-8zD0QQ' });
  const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
  const session = await cameraKit.createSession({ liveRenderTarget });
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { exact: "user" },
    },
  });
  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
    '1e54efe7-148c-4f74-a032-da5b3adef95b',
    '88100c29-c3e6-4deb-bce0-35e91383790e'
  );

  await session.applyLens(lens);

  async function toggleCameraFacingMode() {
    try {
      const constraints = {
        video: { facingMode: isFrontFacing ? "environment" : "user" },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Update the camera session with the new stream
      await session.setSource(stream);
      isFrontFacing = !isFrontFacing; // Toggle the camera facing mode
      
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }
  
  document.querySelector("button")?.addEventListener("click", () => {
    toggleCameraFacingMode();
  });
})();


