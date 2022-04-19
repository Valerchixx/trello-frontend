import {Loader} from '../../types/types';

export function loaderOn() {
	return {
		type: Loader.LOADER_DISPLAY_ON,
	};
}

export function loaderOff() {
	return {
		type: Loader.LOADER_DISPLAY_OFF,
	};
}

