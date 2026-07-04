import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: string | null | undefined): number | null {
    if (!value) return null;

    const dob = new Date(value);

    if (isNaN(dob.getTime())) return null;

    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    if (!hasBirthdayPassed) {
      age--;
    }

    return age;
  }
}
