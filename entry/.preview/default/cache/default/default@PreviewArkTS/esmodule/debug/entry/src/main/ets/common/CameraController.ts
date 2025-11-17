import camera from "@ohos:multimedia.camera";
import type common from "@ohos:app.ability.common";
// Camera preview controller: keep preview-only for stability; capture returns a simulated path.
export class CameraController {
    private ctx: common.UIAbilityContext;
    private camMgr: camera.CameraManager | null = null;
    private camInput: camera.CameraInput | null = null;
    private previewOutput: camera.PreviewOutput | null = null;
    private photoOutput: camera.PhotoOutput | null = null;
    private session: camera.CaptureSession | null = null;
    constructor(ctx: common.UIAbilityContext) {
        this.ctx = ctx;
    }
    async prepare(previewSurfaceId: string): Promise<void> {
        this.camMgr = camera.getCameraManager(this.ctx);
        const cameras: Array<camera.CameraDevice> = this.camMgr.getSupportedCameras();
        // Prefer back camera
        let device: camera.CameraDevice | undefined = undefined;
        for (const d of cameras) {
            if (d.cameraPosition === camera.CameraPosition.CAMERA_POSITION_BACK) {
                device = d;
                break;
            }
        }
        if (!device) {
            device = cameras.length > 0 ? cameras[0] : undefined;
        }
        if (!device) {
            throw new Error('No camera device available');
        }
        this.camInput = this.camMgr.createCameraInput(device);
        // Profiles
        const capability: camera.CameraOutputCapability = this.camMgr.getSupportedOutputCapability(device);
        const previewProfile: camera.Profile = capability.previewProfiles[0];
        const photoProfile: camera.Profile = capability.photoProfiles[0];
        // Outputs
        this.previewOutput = this.camMgr.createPreviewOutput(previewProfile, previewSurfaceId);
        this.photoOutput = this.camMgr.createPhotoOutput(photoProfile);
        // Session pipeline
        this.session = this.camMgr.createCaptureSession();
        this.session.beginConfig();
        this.session.addInput(this.camInput);
        this.session.addOutput(this.previewOutput);
        this.session.addOutput(this.photoOutput);
        await this.session.commitConfig();
        this.camInput.open();
        await this.session.start();
    }
    async capture(): Promise<string> {
        if (!this.photoOutput) {
            throw new Error('PhotoOutput not ready');
        }
        // 简化实现：模拟拍照并返回文件路径
        try {
            const settings: camera.PhotoCaptureSetting = {
                quality: camera.QualityLevel.QUALITY_LEVEL_HIGH,
                rotation: camera.ImageRotation.ROTATION_0
            };
            await this.photoOutput.capture(settings);
            // 返回模拟的文件路径，实际项目中需要处理真实的图片保存
            const timestamp = Date.now();
            return `file://data/storage/el2/base/haps/entry/files/photo_${timestamp}.jpg`;
        }
        catch (error) {
            console.error('Camera capture error:', error);
            throw new Error('Failed to capture photo');
        }
    }
    async release(): Promise<void> {
        try {
            if (this.session) {
                await this.session.stop();
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
        }
        finally {
            // noop
        }
    }
}
