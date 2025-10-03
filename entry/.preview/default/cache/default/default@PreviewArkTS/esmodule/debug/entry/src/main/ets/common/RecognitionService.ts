// Minimal mock recognition service for object learning scenario
export interface RecognizedObject {
    labelEn: string;
    labelZh?: string;
    confidence?: number;
    examples?: string[];
}
export type StudyMode = 'object' | 'document';
export interface StudyRecord {
    id: string;
    mode: StudyMode;
    imageUri: string;
    timestamp: number;
    objects?: RecognizedObject[];
    fullText?: string;
}
export interface RecognitionService {
    recognizeObject(imageUri: string): Promise<StudyRecord>;
}
// Internal helper type to avoid inline object-literal types (ArkTS rule)
interface Candidate {
    key: string;
    obj: RecognizedObject;
}
export class MockRecognitionService implements RecognitionService {
    async recognizeObject(imageUri: string): Promise<StudyRecord> {
        const now = Date.now();
        const id = `study_${now}`;
        const lower = (imageUri || '').toLowerCase();
        // Very simple keyword-based mock mapping
        const candidates: Candidate[] = [
            { key: 'dog', obj: { labelEn: 'dog', labelZh: '狗', confidence: 0.95, examples: ['This is a dog.', 'The dog is running.'] } as RecognizedObject },
            { key: 'cat', obj: { labelEn: 'cat', labelZh: '猫', confidence: 0.94, examples: ['This is a cat.', 'The cat is sleeping.'] } as RecognizedObject },
            { key: 'car', obj: { labelEn: 'car', labelZh: '汽车', confidence: 0.92, examples: ['This is a car.', 'The car is red.'] } as RecognizedObject },
            { key: 'tree', obj: { labelEn: 'tree', labelZh: '树', confidence: 0.90, examples: ['This is a tree.', 'The tree is tall.'] } as RecognizedObject },
            { key: 'book', obj: { labelEn: 'book', labelZh: '书', confidence: 0.88, examples: ['This is a book.', 'The book is interesting.'] } as RecognizedObject },
            { key: 'ball', obj: { labelEn: 'ball', labelZh: '球', confidence: 0.87, examples: ['This is a ball.', 'Kick the ball.'] } as RecognizedObject },
        ];
        let found: RecognizedObject | null = null;
        for (const c of candidates) {
            if (lower.indexOf(c.key) >= 0) {
                found = c.obj;
                break;
            }
        }
        if (!found) {
            // default mock result
            const defaultObj: RecognizedObject = {
                labelEn: 'object',
                labelZh: '物体',
                confidence: 0.8,
                examples: ['This is an object.', 'I see an object.']
            };
            found = defaultObj;
        }
        return {
            id,
            mode: 'object',
            imageUri: imageUri,
            timestamp: now,
            objects: found ? [found] : []
        };
    }
}
