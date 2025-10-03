import { camera } from '@kit.CameraKit'
import { common } from '@kit.AbilityKit'

// Camera preview controller: keep preview-only for stability; capture returns a simulated path.
export class CameraController {
  private ctx: common.UIAbilityContext;
  private camMgr: camera.CameraManager | null = null;
  private camInput: camera.CameraInput | null = null;
  private previewOutput: camera.PreviewOutput | null = null;
  private session: camera.CaptureSession | null = null;

  constructor(ctx: common.UIAbilityContext) {
    this.ctx = ctx;
  }

  async prepare(previewSurfaceId: string): Promise<void> {
    this.camMgr = camera.getCameraManager(this.ctx);
    const cameras: camera.CameraDevice[] = this.camMgr.getSupportedCameras();
    const chosen: camera.CameraDevice | undefined = (cameras && cameras.length > 0) ? cameras[0] : undefined;
    if (!chosen) {
      throw new Error('No camera device available');
    }
    this.camInput = this.camMgr.createCameraInput(chosen);

    this.previewOutput = this.camMgr.createPreviewOutput(previewSurfaceId);

    this.session = this.camMgr.createCaptureSession();
    this.session.beginConfig();
    this.session.addInput(this.camInput);
    this.session.addOutput(this.previewOutput);
    this.session.commitConfig();

    this.camInput.open();
    this.session.start();
  }

  async capture(): Promise<string> {
    // TODO: Replace with real photo capture and saving (PhotoOutput/Profile) aligned to target SDK.
    const filePath: string = `file://media/Photo/photo_${Date.now()}.jpg`;
    return Promise.resolve(filePath);
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
    } finally {
      // noop
    }
  }
}
