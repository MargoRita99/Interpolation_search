import { Injectable } from '@nestjs/common';
import { Information } from './information.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InformationService { 
  constructor(
    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>, // внедряем репозиторий в сервис
  ) {}

  async getAllInformation(): Promise<Information[]> {
    return await this.informationRepository.find({ order: { title: 'ASC' } });
  }
  async addInformation(newInformation: Partial<Information>): Promise<void> {
    const informs = await this.getAllInformation();

    // Найти индекс для вставки
    let insertIndex = informs.findIndex(information => information.title.localeCompare(newInformation.title) > 0);
    if (insertIndex === -1) {
      insertIndex = informs.length;
    }

    // Обновить номера страниц
    for (let i = informs.length - 1; i >= insertIndex; i--) {
      informs[i].number_of_page += 1;
      await this.informationRepository.save(informs[i]);
    }

    // Вставить новый экспонат в базу данных
    const newPageNumber = insertIndex + 1;
    const information = this.informationRepository.create({ ...newInformation, number_of_page: newPageNumber });
    await this.informationRepository.save(information);
  }

  async findInformationByTitle(title: string): Promise<Information | null> {
    const informs = await this.getAllInformation();
    const index = this.interpolation(informs, title);
    if (index === -1) return null;
    return informs[index];
  }

  // Интерполяционный поиск
  private interpolation(arr: Information[], x: string): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && arr[low].title <= x && arr[high].title >= x) {
      if (low === high) {
        if (arr[low].title === x) {
          return low;
        }
        return -1;
      }

      const pos = low + Math.floor(((x.localeCompare(arr[low].title)) * (high - low)) / (arr[high].title.localeCompare(arr[low].title)));

      if (arr[pos].title === x) {
        return pos;
      }

      if (arr[pos].title < x) {
        low = pos + 1;
      } else {
        high = pos - 1;
      }
    }

    return -1;
  }
}