import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import exp from "constants";

class connectData {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    receiverId:number;

    @IsNotEmpty()
    @IsNumber()
    senderId:number;
}

export {connectData}