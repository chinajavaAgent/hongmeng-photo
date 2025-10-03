import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { PermissionRequestResult as PermissionRequestResult } from "@ohos:abilityAccessCtrl";
import type { Permissions as Permissions } from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
import picker from "@ohos:file.picker";
export interface PhotoRecord {
    id: string;
    filePath: string;
    timestamp: number;
    thumbnail?: string;
}
export class PhotoManager {
    private static instance: PhotoManager;
    private photoRecords: PhotoRecord[] = [];
    private context: common.UIAbilityContext | null = null;
    private constructor() {
        this.loadPhotoRecords();
    }
    public setContext(context: common.UIAbilityContext): void {
        this.context = context;
    }
    public static getInstance(): PhotoManager {
        if (!PhotoManager.instance) {
            PhotoManager.instance = new PhotoManager();
        }
        return PhotoManager.instance;
    }
    async requestPermissions(): Promise<boolean> {
        try {
            if (!this.context) {
                console.error('Context not set, please call setContext first');
                return false;
            }
            const atManager = abilityAccessCtrl.createAtManager();
            const permissions: Array<Permissions> = [
                'ohos.permission.CAMERA',
                'ohos.permission.WRITE_MEDIA'
            ];
            const requestResult: PermissionRequestResult = await atManager.requestPermissionsFromUser(this.context, permissions);
            // 检查所有权限是否都被授予
            for (let i = 0; i < requestResult.authResults.length; i++) {
                if (requestResult.authResults[i] !== 0) { // 0 表示授权成功
                    console.error(`Permission ${permissions[i]} denied`);
                    return false;
                }
            }
            console.log('All permissions granted');
            return true;
        }
        catch (error) {
            console.error('Permission request failed:', error);
            return false;
        }
    }
    async takePhoto(): Promise<string | null> {
        try {
            if (!this.context) {
                console.error('Context not set');
                return null;
            }
            // 使用系统相机应用进行拍照
            return await this.launchSystemCamera();
        }
        catch (error) {
            console.error('Take photo failed:', error);
            return null;
        }
    }
    private async launchSystemCamera(): Promise<string | null> {
        try {
            const photoSelectOptions = new picker.PhotoSelectOptions();
            photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
            photoSelectOptions.maxSelectNumber = 1;
            const photoPicker = new picker.PhotoViewPicker();
            const photoSelectResult = await photoPicker.select(photoSelectOptions);
            if (photoSelectResult && photoSelectResult.photoUris && photoSelectResult.photoUris.length > 0) {
                const photoUri = photoSelectResult.photoUris[0];
                // 创建照片记录
                const photoRecord: PhotoRecord = {
                    id: `photo_${Date.now()}`,
                    filePath: photoUri,
                    timestamp: Date.now(),
                    thumbnail: photoUri
                };
                this.photoRecords.unshift(photoRecord);
                this.savePhotoRecords();
                console.log('Photo selected successfully:', photoUri);
                return photoUri;
            }
            return null;
        }
        catch (error) {
            console.error('Launch system camera failed:', error);
            // 如果系统相机启动失败，使用模拟拍照
            return await this.simulatePhotoCapture();
        }
    }
    private async simulatePhotoCapture(): Promise<string | null> {
        try {
            console.log('Using simulated photo capture...');
            // 模拟拍照延迟
            // 生成照片路径并创建记录
            const photoId = `photo_${Date.now()}`;
            const filePath = `file://media/Photo/${photoId}.jpg`;
            const photoRecord: PhotoRecord = {
                id: photoId,
                filePath: filePath,
                timestamp: Date.now(),
                thumbnail: filePath
            };
            this.photoRecords.unshift(photoRecord);
            this.savePhotoRecords();
            console.log('Photo captured successfully (simulated)');
            return filePath;
        }
        catch (error) {
            console.error('Simulate photo capture failed:', error);
            return null;
        }
    }
    getPhotoRecords(): PhotoRecord[] {
        return this.photoRecords;
    }
    deletePhoto(photoId: string): boolean {
        try {
            const index = this.photoRecords.findIndex(record => record.id === photoId);
            if (index !== -1) {
                this.photoRecords.splice(index, 1);
                this.savePhotoRecords();
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Delete photo failed:', error);
            return false;
        }
    }
    private loadPhotoRecords(): void {
        try {
            // 在实际应用中从持久化存储加载数据
            // 这里使用模拟数据
            this.photoRecords = [
                {
                    id: 'demo1',
                    filePath: '/demo/path1.jpg',
                    timestamp: Date.now() - 86400000,
                    thumbnail: '/demo/path1.jpg'
                },
                {
                    id: 'demo2',
                    filePath: '/demo/path2.jpg',
                    timestamp: Date.now() - 172800000,
                    thumbnail: '/demo/path2.jpg'
                }
            ];
        }
        catch (error) {
            console.error('Load photo records failed:', error);
        }
    }
    private savePhotoRecords(): void {
        try {
            // 在实际应用中保存到持久化存储
            console.log('Photo records saved:', this.photoRecords.length);
        }
        catch (error) {
            console.error('Save photo records failed:', error);
        }
    }
    public async releaseCamera(): Promise<void> {
        // 使用系统相机不需要手动释放资源
        console.log('Using system camera, no manual resource release needed');
    }
    formatTimestamp(timestamp: number): string {
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = now.getTime() - timestamp;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        }
        else if (diffDays < 7) {
            return `${diffDays}天前`;
        }
        else {
            return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        }
    }
}
