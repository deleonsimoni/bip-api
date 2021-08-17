import {Inject, Injectable} from '@nestjs/common';
import {S3} from 'aws-sdk';
import {ConfigService} from '@nestjs/config';
import {v4 as uuid} from 'uuid';

@Injectable()
export class FileService {
    constructor(
        private readonly configService: ConfigService
    ) {
    }

    async uploadFile(dataBuffer: Buffer, filename: string) {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Body: dataBuffer,
            Key: `${filename}`
        })
            .promise();


        return uploadResult.Location;

    }


    async deletePublicFile(url) {
        const s3 = new S3();
        await s3.deleteObject({
            Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Key: url,
        }).promise();
    }

}
