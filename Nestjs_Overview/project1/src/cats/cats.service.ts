import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    catsSayHello() {
        return 'Hello Cats!';
    }
}
