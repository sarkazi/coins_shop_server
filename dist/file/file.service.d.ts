import { FileDto } from './file.dto';
export declare class FileService {
    uploadFile(files: FileDto, route?: string): Promise<{
        frontImageUrl: string;
        frontImageName: string;
        backImageUrl: string;
        backImageName: string;
    }>;
}
