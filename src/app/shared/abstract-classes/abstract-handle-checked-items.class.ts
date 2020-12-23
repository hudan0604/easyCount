import { LocalStorageService } from '../services/local-storage.service';

export abstract class AbstractHandleCheckedItemsClass {

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  addItemToTheListToHandle(itemId: string) {
    const itemsInLS = this.localStorageService.getValueParsed('ids-to-handle');
    const listToHandle = itemsInLS ? itemsInLS : [];
    listToHandle.push(itemId.toString());
    this.localStorageService.setItemStringified('ids-to-handle', listToHandle);
    this.localStorageService.refreshValueOfListToHandle();
  }

  removeItemFromTheListToHandle(itemId: string) {
    let listToHandle = this.localStorageService.getValueParsed('ids-to-handle');
    listToHandle = listToHandle.filter((id: string) => id !== itemId);
    this.localStorageService.setItemStringified('ids-to-handle', listToHandle);
    this.localStorageService.refreshValueOfListToHandle();
  }
}
