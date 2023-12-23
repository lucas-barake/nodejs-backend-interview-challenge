import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("health")
@Controller("health")
export class AppController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: "Health check" })
  @ApiResponse({ status: 200, description: "OK" })
  private health(): string {
    return "OK";
  }
}
