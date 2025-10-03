import { camera } from '@kit.CameraKit'
import { common } from '@kit.AbilityKit'
import { image } from '@kit.ImageKit'
import { photoAccessHelper } from '@kit.MediaLibraryKit'
import fs from '@ohos.file.fs'

// Camera preview controller (skeleton). It prepares camera session and preview.
// Note: Capturing currently simulates record creation; saving to media will be added in next step.
export class CameraController {
  private ctx: common.UIAbilityContext;
  private camMgr: camera.CameraManager | null = null;
  private camInput: camera.CameraInput | null = null;
  private previewOutput: camera.PreviewOutput | null = null;
  private photoOutput: camera.PhotoOutput | null = null;
  private imgReceiver: image.ImageReceiver | null = null;
  private session: camera.CaptureSession | null = null;

  constructor(ctx: common.UIAbilityContext) {
    this.ctx = ctx;
  }

  async prepare(previewSurfaceId: string): Promise<void> {
    // Initialize camera manager and build a basic preview + photo pipeline
    this.camMgr = camera.getCameraManager(this.ctx);
    const cameras = this.camMgr.getSupportedCameras();
    const back = cameras.find((c) => (c.cameraPosition === camera.CameraPosition.BACK)) || cameras[0];
    this.camInput = this.camMgr.createCameraInput(back);

    // Create preview to given surface
    this.previewOutput = this.camMgr.createPreviewOutput(previewSurfaceId);

    // Create photo output by binding to ImageReceiver surface
    const w = 1280;
    const h = 960;
    this.imgReceiver = image.createImageReceiver(w, h, image.ImageFormat.JPEG, 3);
    const recvId = this.imgReceiver.getReceivingSurfaceId();
    this.photoOutput = this.camMgr.createPhotoOutput(recvId);
    // Create session
    this.session = this.camMgr.createCaptureSession();
    this.session.beginConfig();
    this.session.addInput(this.camInput);
    this.session.addOutput(this.previewOutput);
    this.session.addOutput(this.photoOutput);
    this.session.commitConfig();
    // Open input & start session
    this.camInput.open();
    this.session.start();
  }

  async capture(): Promise<string> {
    if (!this.photoOutput || !this.imgReceiver) {
      throw new Error('Camera not ready');
    }
    const uriPromise = new Promise<string>(async (resolve, reject) => {
      const handler = async () => {
        try {
          const img = await this.imgReceiver!.readNextImage();
          const pixelMap = await img.getPixelMap();
          const packer = image.createImagePacker();
          const data = await packer.packing(pixelMap, { format: image.ImageFormat.JPEG, quality: 92 });
          const fileName = `photo_${Date.now()}.jpg`;
          const absPath = `${this.ctx.filesDir}/${fileName}`;
          const file = await fs.open(absPath, fs.OpenMode.CREATE | fs.OpenMode.WRITE_ONLY);
          await fs.write(file.fd, new Uint8Array(data));
          await fs.close(file);
          pixelMap.release();
          img.release();
          resolve(`file://${absPath}`);
        } catch (err) {
          reject(err as Error);
        } finally {
          this.imgReceiver!.off('imageAvailable', handler);
        }
      };
      this.imgReceiver.on('imageAvailable', handler);
      try {
        await this.photoOutput.capture();
      } catch (e) {
        this.imgReceiver.off('imageAvailable', handler);
        reject(e as Error);
      }
    });
    return uriPromise;
  }

  async release(): Promise<void> {
    try {
      if (this.session) {
        this.session.stop();
      }
      if (this.camInput) {
        this.camInput.close();
      }
      if (this.previewOutput) {
        this.previewOutput.release();
      }
      if (this.photoOutput) {
        this.photoOutput.release();
      }
      if (this.imgReceiver) {
        this.imgReceiver.release();
      }
    } finally {
      // Best-effort release
    }
  }
}
