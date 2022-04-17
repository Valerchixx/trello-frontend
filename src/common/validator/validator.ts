export function validator(regExp:RegExp, title:string):boolean {
	return regExp.test(title);
}

export const regExp = /^((\w|[А-ЯЁа-яё])+[\s.-]?)+$|^$/;
