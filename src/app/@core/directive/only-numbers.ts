import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[onlyNumbers]',
})
export class OnlyNumbersDirective {
    @HostListener('keypress', ['$event']) onKeyDown(e: KeyboardEvent) {
        const regEx = new RegExp('[^0-9]', 'g');
        const permittedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

        if (
            e.key.match(regEx) && !permittedKeys.find(x => x === e.key)) {
            e.preventDefault();
        }
    }
}
