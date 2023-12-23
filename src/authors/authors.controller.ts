import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("authors")
@Controller("authors")
export class AuthorsController {}
