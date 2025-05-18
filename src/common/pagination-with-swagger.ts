import { ApiProperty } from '@nestjs/swagger';

export class IPaginationMetaSwagger {
  @ApiProperty({ description: 'Number of items returned in the current page' })
  itemCount: number;

  @ApiProperty({
    description: 'Total number of items available',
    required: false,
  })
  totalItems?: number;

  @ApiProperty({ description: 'Number of items per page' })
  itemsPerPage: number;

  @ApiProperty({ description: 'Total number of pages', required: false })
  totalPages?: number;

  @ApiProperty({ description: 'Current page number' })
  currentPage: number;
}
