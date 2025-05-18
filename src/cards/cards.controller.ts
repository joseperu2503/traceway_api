import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('my-cards')
  @JwtAuth()
  myCards(@GetUser() user: User) {
    return this.cardsService.myCards(user);
  }

  @Post()
  @JwtAuth()
  create(@Body() createCartDto: CreateCardDto, @GetUser() user: User) {
    return this.cardsService.createCard(createCartDto, user);
  }

  @Delete(':cardId')
  @JwtAuth()
  delete(@Param('cardId') cardId: string, @GetUser() user: User) {
    return this.cardsService.deleteCard(cardId, user);
  }

  @Get(':cardId')
  @JwtAuth()
  findOne(@Param('cardId') cardId: string, @GetUser() user: User) {
    return this.cardsService.deleteCard(cardId, user);
  }
}
